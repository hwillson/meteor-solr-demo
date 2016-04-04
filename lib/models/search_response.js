SearchResponse = (() => {

  let _public = {};
  let _private = {};

  _public = {

    searchResponse: {},
    docs: [],
    facets: {},
    nestedCategories: {},
    loggedSearchId: '',

    init(searchResponse) {
      _public.searchResponse = searchResponse;
      _private.parseDocs();
      _private.parseFacets();
      _private.buildNestedCategories();
      _private.logSearch();
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
          let content = highlighting[doc.id].content;
          if (content) {
            content = content.replace(/&nbsp;/g, ' ');
          }
          doc.content = '&hellip;' + content.join(' &hellip; ') + '&hellip;';
        } else {
          let content = doc.summary;
          if (content) {
            content = content.replace(/&nbsp;/g, ' ');
          }
          doc.content = content + '&hellip;';
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
            const name = facetValues[i];
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
      const hierarchicalFacets = Object.keys(SearchConfig.hierarchicalFacets);
      hierarchicalFacets.forEach((nestedCategoryField) => {
        const splitCategories = [];
        _public.facets[nestedCategoryField].forEach((value) => {
          splitCategories.push({
            names: value.name.substring(0, value.name.length - 1).split('/'),
            count: value.count
          });
        });
        const nestedCategory = Object.create(NestedCategory);
        nestedCategory.init();
        _public.nestedCategories[nestedCategoryField] =
          nestedCategory.build(splitCategories);
      });
    },

    logSearch() {
      _public.loggedSearchId = App.utilities.searchLogger.logSearchToDatabase(
        _public.searchResponse.responseHeader.params.q,
        _public.searchResponse.responseHeader.params.fq,
        _public.searchResponse.response.numFound,
        Meteor.user()
      );
    }

  };

  return _public;
})();
