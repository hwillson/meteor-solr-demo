SearchConfig = {};
_.extend(SearchConfig, Meteor.settings.public.search);

SearchConfig.getSuggesterUrl = function getSuggesterUrl() {
  const suggesterUrl =
    `${this.scheme}://${this.host}:${this.port}/solr/${this.core}`
    + `${this.suggesterUrl}`;
  return suggesterUrl;
};
