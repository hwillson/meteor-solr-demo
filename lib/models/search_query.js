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
    let query = initQuery.q(keywords);

    // Set pagination
    let start = 0;
    if (options && options.currentPage) {
      start = (options.currentPage - 1) * 10;
    }
    query.start(start);

    // Add field refinements
    if (options && options.fields) {
      _.keys(options.fields).forEach((field) => {
        query = query.matchFilter(field, options.fields[field]);
      });
    }

    // Add facets
    _.keys(SearchConfig.facetFields).forEach((field) => {
      query = query.facet({ field });
    });

    return query;
  }
};
