import { analytics } from 'meteor/okgrow:analytics';
import { Meteor } from 'meteor/meteor';

import LoggedSearches from '../api/logged_searches/collection';
import LoggedSearchResults from '../api/logged_search_results/collection';

const SearchLogger = {
  logSearchToCloud(searchParams) {
    if (this.isLoggingEnabled('cloud') && searchParams
        && searchParams.keywords) {
      let path = `/results?q=${searchParams.keywords}`;
      const lastAddedFieldName = searchParams.lastAddedFieldName;
      if (lastAddedFieldName && searchParams.fields[lastAddedFieldName]) {
        path +=
          `&cat=${lastAddedFieldName}:`
          + `${searchParams.fields[lastAddedFieldName]}`;
      }
      analytics.page('Search Results', { path });
    }
  },

  logSearchToDatabase(keywords, fieldQuery, numberOfResults, user) {
    let loggedSearchId;
    if (this.isLoggingEnabled('database') && Meteor.isServer) {
      let fields = [];
      if (fieldQuery) {
        if (Array.isArray(fieldQuery)) {
          fields = fieldQuery;
        } else {
          fields.push(fieldQuery);
        }
      }
      const username = (user ? user.username : null);
      const timestamp = new Date();
      loggedSearchId = LoggedSearches.insert({
        username,
        keywords,
        fields,
        numberOfResults,
        timestamp,
      });
    }
    return loggedSearchId;
  },

  logSearchResult(documentUrl, page, loggedSearchId) {
    if (this.isLoggingEnabled('cloud')) {
      analytics.track(`Viewed search result: ${documentUrl}`, {
        category: 'Search',
      });
    } else {
      LoggedSearchResults.create.call({
        loggedSearchId,
        documentUrl,
        page,
      });
    }
  },

  isLoggingEnabled(type = 'cloud') {
    let isLoggingEnabled = false;
    const analyticsContainers =
      Meteor.settings.public.analyticsControl.containers;
    if (Meteor.settings.public.analyticsControl.loggingEnabled
        && (analyticsContainers.indexOf(type) > -1)) {
      isLoggingEnabled = true;
    }
    return isLoggingEnabled;
  },
};

export default SearchLogger;
