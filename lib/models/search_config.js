SearchConfig = {
  host: 'localhost',
  port: 8983,
  core: 'testcore',
  limitFields: [
    'id',
    'title',
    'summary',
    'date_ss',
    'lastmodified',
    'returnUrl',
    'author',
    'doctype',
    'source'
  ],
  flatFacets: ['doctype', 'author'],
  hierarchicalFacets: ['source', 'date_ss']
};
