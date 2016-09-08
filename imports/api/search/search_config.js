import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

const SearchConfig = {};
_.extend(SearchConfig, Meteor.settings.public.search);

SearchConfig.getSuggesterUrl = function getSuggesterUrl() {
  const suggesterUrl =
    `${this.scheme}://${this.host}:${this.port}/solr/${this.core}`
    + `${this.suggesterUrl}`;
  return suggesterUrl;
};

export default SearchConfig;
