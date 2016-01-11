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

    // Set pagination
    let start = 0;
    if (options && options.currentPage) {
      start = (options.currentPage - 1) * 10;
    }
    query.start(start);

    // Restrict returned fields
    query.restrict(SearchConfig.limitFields);

    // Add field refinements
    // const facetPrefix = {};
    if (options && options.fields) {
      _.keys(options.fields).forEach((field) => {
        query.matchFilter(field, '"' + options.fields[field] + '"');
        // if (SearchConfig.hierarchicalFacets.indexOf(field) > -1) {
        //   facetPrefix[field] = options.fields[field];
        // }
      });
    }

    // Facets
    const facetFields =
      SearchConfig.flatFacets.concat(SearchConfig.hierarchicalFacets);
    const facetConfig = {
      field: facetFields,
      mincount: 1
    };
    query.facet(facetConfig);

    // Add any facet prefix refinements.
    // _.keys(facetPrefix).forEach((field) => {
    //   query = query.set('f.' + field + '.facet.prefix=' + facetPrefix[field]);
    // });

    return query;

  }

};
