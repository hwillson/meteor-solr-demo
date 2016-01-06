const sorlSearch = Meteor.npmRequire('solr-client');
const solrClient = sorlSearch.createClient({
  host: 'localhost',
  port: 8983,
  core: 'testcore'
});

const buildSearchQuery = (keywords, options) => {
  // Add keywords
  let query = solrClient.createQuery().q(keywords);

  // Set pagination
  let start = 0;
  if (options && options.currentPage) {
    start = (options.currentPage - 1) * 10;
  }
  query.start(start);

  // Add facets
  _.keys(SearchConfig.facetFields).forEach((field) => {
    query = query.facet({ field });
  });

  return query;
};

SearchSource.defineSource('powerSearch', (keywords, options) => {
  Meteor._sleepForMs(500);
  let docs = [];
  const metadata = {
    keywords,
    totalResults: 0
  };

  if (keywords) {
    const query = buildSearchQuery(keywords, options);
    const doSearch = Meteor.wrapAsync(solrClient.search, solrClient);
    const solrSearchResponse = Object.create(SearchResponse);
    solrSearchResponse.init(doSearch(query));
    docs = solrSearchResponse.docs;
    metadata.totalResults = solrSearchResponse.totalResults();
    metadata.facets = solrSearchResponse.facets;
  }
  return {
    data: docs,
    metadata
  };
});
