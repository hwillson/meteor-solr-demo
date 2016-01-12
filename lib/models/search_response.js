SearchResponse = (() => {
  let _public = {};
  let _private = {};

  _public = {

    searchResponse: {},
    docs: [],
    facets: {},
    nestedCategories: {},

    init(searchResponse) {
      _public.searchResponse = searchResponse;
      _private.parseDocs();
      _private.parseFacets();
      _private.buildNestedCategories();
    },

    totalResults() {
      return this.searchResponse.response.numFound;
    }
  };

  _private = {

    parseDocs() {
      const docs = _public.searchResponse.response.docs;
      const highlighting = _public.searchResponse.highlighting;
      docs.forEach(doc => {
        doc._id = doc.id;
        if (highlighting[doc.id] && highlighting[doc.id].content) {
          doc.content =
            '&hellip;' + highlighting[doc.id].content.join(' &hellip; ')
            + '&hellip;';
        } else {
          doc.content = doc.summary + '&hellip;';
        }
      });
      _public.docs = docs;
    },

    parseFacets() {
      const facetCounts = _public.searchResponse.facet_counts;
      if (facetCounts) {
        const facets = {};
        _.keys(facetCounts.facet_fields).forEach((facet) => {
          facets[facet] = [];
          const facetValues = facetCounts.facet_fields[facet];
          for (let i = 0; i < facetValues.length; i += 2) {
            let name;
            if (SearchConfig.customFacetLabels[facet]) {
              name = SearchConfig.customFacetLabels[facet][facetValues[i]];
              if (!name) {
                name = facetValues[i];
              }
            } else {
              name = facetValues[i];
            }
            const count = facetValues[i + 1];
            if (count > 0) {
              facets[facet].push({
                name,
                count
              });
            }
          }
        });
        _public.facets = facets;
      }
    },

    buildNestedCategories() {
      SearchConfig.hierarchicalFacets.forEach((nestedCategoryField) => {
        const splitCategories = [];
        _public.facets[nestedCategoryField].forEach((value) => {
          splitCategories.push(
            value.name.substring(0, value.name.length - 1
          ).split('/'));
        });
        const nestedCategory = Object.create(NestedCategory);
        nestedCategory.init();
        _public.nestedCategories[nestedCategoryField] =
          nestedCategory.build(splitCategories);
      });
    }

  };

  return _public;
})();
