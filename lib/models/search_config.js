SearchConfig = {
  host: 'localhost',
  port: 8983,
  core: 'testcore',
  limitFields: [
    'id',
    'title',
    'content',
    'date',
    'lastmodified',
    'url',
    'author',
    'doctype',
    'source'
  ],
  flatFacets: ['doctype', 'author'],
  hierarchicalFacets: ['source', 'date']
};
