SearchResponse = (() => {
  let _public = {};
  let _private = {};

  _public = {
    searchResponse: {},
    docs: [],
    facets: [],

    init(searchResponse) {
      _public.searchResponse = searchResponse;
      _private.parseDocs();
      _private.parseFacets();
    },

    totalResults() {
      return this.searchResponse.response.numFound;
    }
  };

  _private = {
    parseDocs() {
      const docs = _public.searchResponse.response.docs;
      docs.forEach(doc => {
        doc._id = doc.id;
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
    }
  };

  return _public;
})();
