SearchQuery = {
  buildQueryString(searchParameters) {
    let query = searchParameters.keywords;
    if (searchParameters.fields) {
      _.keys(searchParameters.fields).forEach((field) => {
        query += ' AND ' + field + ':"' + searchParameters.fields[field] + '"';
      });
    }
    return query;
  }
};
