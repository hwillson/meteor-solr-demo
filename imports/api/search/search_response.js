import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import SearchConfig from './search_config';
import NestedCategory from './nested_category';
import SearchLogger from '../../utility/search_logger';

const SearchResponse = (() => {
  const publicApi = {
    searchResponse: {},
    docs: [],
    facets: {},
    nestedCategories: {},
    loggedSearchId: '',
  };
  const privateApi = {};

  /* Public */

  publicApi.init = (searchResponse) => {
    publicApi.searchResponse = searchResponse;
    privateApi.parseDocs();
    privateApi.parseFacets();
    privateApi.buildNestedCategories();
    privateApi.logSearch();
  };

  publicApi.totalResults = () => publicApi.searchResponse.response.numFound;

  /* Private */

  privateApi.parseDocs = () => {
    const docs = publicApi.searchResponse.response.docs;
    const highlighting = publicApi.searchResponse.highlighting;
    docs.forEach(doc => {
      const modifiedDoc = doc;
      modifiedDoc._id = modifiedDoc.id;
      if (highlighting[modifiedDoc.id] && highlighting[modifiedDoc.id].content) {
        modifiedDoc.content =
          `&hellip;${highlighting[modifiedDoc.id].content.join(' &hellip; ')}`
          + '&hellip;';
      } else {
        modifiedDoc.content = `${modifiedDoc.summary}&hellip;`;
      }
    });
    publicApi.docs = docs;
  };

  privateApi.parseFacets = () => {
    const facetCounts = publicApi.searchResponse.facet_counts;
    if (facetCounts) {
      const facets = {};
      _.keys(facetCounts.facet_fields).forEach((facet) => {
        facets[facet] = [];
        const facetValues = facetCounts.facet_fields[facet];
        for (let i = 0; i < facetValues.length; i += 2) {
          const name = facetValues[i];
          const count = facetValues[i + 1];
          if (count > 0) {
            facets[facet].push({
              name,
              count,
            });
          }
        }
      });
      publicApi.facets = facets;
    }
  };

  privateApi.buildNestedCategories = () => {
    const hierarchicalFacets = Object.keys(SearchConfig.hierarchicalFacets);
    hierarchicalFacets.forEach((nestedCategoryField) => {
      const splitCategories = [];
      publicApi.facets[nestedCategoryField].forEach((value) => {
        splitCategories.push({
          names: value.name.substring(0, value.name.length - 1).split('/'),
          count: value.count,
        });
      });
      const nestedCategory = Object.create(NestedCategory);
      nestedCategory.init();
      publicApi.nestedCategories[nestedCategoryField] =
        nestedCategory.build(splitCategories);
    });
  };

  privateApi.logSearch = () => {
    publicApi.loggedSearchId = SearchLogger.logSearchToDatabase(
      publicApi.searchResponse.responseHeader.params.q,
      publicApi.searchResponse.responseHeader.params.fq,
      publicApi.searchResponse.response.numFound,
      Meteor.user()
    );
  };

  return publicApi;
})();

export default SearchResponse;
