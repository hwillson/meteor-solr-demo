/* eslint-disable no-underscore-dangle */

import solrSearch from 'solr-client';
import { SearchSource } from 'meteor/meteorhacks:search-source';
import { Meteor } from 'meteor/meteor';

import SearchConfig from '../../api/search/search_config';
import SearchQuery from '../../api/search/search_query';
import SearchResponse from '../../api/search/search_response';

const solrClient = solrSearch.createClient({
  host: SearchConfig.host,
  port: SearchConfig.port,
  core: SearchConfig.core,
});

SearchSource.defineSource('powerSearch', (keywords, options) => {
  Meteor._sleepForMs(500);
  let docs = [];
  const metadata = {
    keywords,
    totalResults: 0,
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
    metadata.loggedSearchId = solrSearchResponse.loggedSearchId;
  }

  return {
    data: docs,
    metadata,
  };
});
