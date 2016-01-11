const sorlSearch = Meteor.npmRequire('solr-client');
const solrClient = sorlSearch.createClient({
  host: 'localhost',
  port: 8983,
  core: 'testcore'
});

SearchSource.defineSource('powerSearch', (keywords, options) => {

  Meteor._sleepForMs(500);
  let docs = [];
  const metadata = {
    keywords,
    totalResults: 0
  };

  if (keywords) {
    const query =
      SearchQuery.buildSearchQuery(solrClient.createQuery(), keywords, options);
    const doSearch = Meteor.wrapAsync(solrClient.search, solrClient);
    const solrSearchResponse = Object.create(SearchResponse);
    solrSearchResponse.init(doSearch(query));
    docs = solrSearchResponse.docs;
    metadata.totalResults = solrSearchResponse.totalResults();
    metadata.facets = solrSearchResponse.facets;
    metadata.nestedCategories = solrSearchResponse.nestedCategories;
  }

  return {
    data: docs,
    metadata
  };

});
