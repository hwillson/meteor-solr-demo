const sorlSearch = Meteor.npmRequire('solr-client');
const solrClient = sorlSearch.createClient({
  host: 'localhost',
  port: 8983,
  core: 'techproducts'
});

SearchSource.defineSource('powerSearch', (keywords, options) => {
  Meteor._sleepForMs(500);
  let docs = [];
  const metadata = {
    totalResults: 0
  };

  if (keywords) {
    const query = solrClient.createQuery().q(keywords);

    let start = 0;
    if (options && options.page) {
      start = (options.page - 1) * 10;
    }
    query.start(start);

    const doSearch = Meteor.wrapAsync(solrClient.search, solrClient);
    const searchResponse = doSearch(query);
    docs = searchResponse.response.docs;
    docs.forEach(doc => {
      doc._id = doc.id;
    });
    metadata.totalResults = searchResponse.response.numFound;
  }
  return {
    data: docs,
    metadata
  };
});
