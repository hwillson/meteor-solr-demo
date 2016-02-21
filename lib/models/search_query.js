// SearchQuery = {
//   buildQueryString(searchParameters) {
//     let query = searchParameters.keywords;
//     if (searchParameters.fields) {
//       _.keys(searchParameters.fields).forEach((field) => {
//         query += ' AND ' + field + ':"' + searchParameters.fields[field] + '"';
//       });
//     }
//     return query;
//   }
// };

SearchQuery = {

  buildSearchQuery(initQuery, keywords, options) {

    // Add keywords
    const query = initQuery.q(keywords);

    // Default to AND'ing keywords together
    query.qop('AND');

    // Set pagination
    let resultsPerPage = 10;
    if (options && options.resultsPerPage) {
      resultsPerPage = options.resultsPerPage;
    }

    let start = 0;
    if (options && options.currentPage) {
      start = (options.currentPage - 1) * resultsPerPage;
    }
    query.start(start);

    if (options && options.resultsPerPage) {
      query.rows(options.resultsPerPage);
    }

    // Set highlighting
    query.hl({
      on: true,
      fl: '*',
      simplePre: '<strong>',
      simplePost: '</strong>',
      snippets: 3,
      fragsize: 200
    });

    // Restrict returned fields
    query.restrict(SearchConfig.limitFields);

    // Add field refinements
    if (options && options.fields) {
      _.keys(options.fields).forEach((field) => {
        query.matchFilter(field, '"' + options.fields[field] + '"');
      });
    }

    // Facets
    const flatFacets = Object.keys(SearchConfig.flatFacets);
    const hierarchicalFacets = Object.keys(SearchConfig.hierarchicalFacets);
    const facetFields = flatFacets.concat(hierarchicalFacets);
    const facetConfig = {
      field: facetFields,
      mincount: 1
    };
    query.facet(facetConfig);

    // Facet size and sorting
    flatFacets.forEach((fieldName) => {
      const limit = SearchConfig.flatFacets[fieldName].limit;
      const sort = SearchConfig.flatFacets[fieldName].sort;
      query.set(`f.${fieldName}.facet.limit=${limit}`);
      query.set(`f.${fieldName}.facet.sort=${sort}`);
    });
    hierarchicalFacets.forEach((fieldName) => {
      const limit = SearchConfig.hierarchicalFacets[fieldName].limit;
      const sort = SearchConfig.hierarchicalFacets[fieldName].sort;
      query.set(`f.${fieldName}.facet.limit=${limit}`);
      query.set(`f.${fieldName}.facet.sort=${sort}`);
    });

    return query;

  }

};
