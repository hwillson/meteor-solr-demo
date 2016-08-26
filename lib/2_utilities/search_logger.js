App.utilities.searchLogger = (() => {

  let _public;

  _public = {

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
        const loggedSearchId = App.collections.loggedSearches.insert({
          username,
          keywords,
          fields,
          numberOfResults,
          timestamp,
        });
        return loggedSearchId;
      }
    },

    logSearchResult(documentUrl, page, loggedSearchId) {
      if (App.utilities.searchLogger.isLoggingEnabled('cloud')) {
        analytics.track(`Viewed search result: ${documentUrl}`, {
          category: 'Search'
        });
      } else {
        App.methods.loggedSearchResult.create.call({
          loggedSearchId,
          documentUrl,
          page
        });
      }
    },

    isLoggingEnabled(type = 'cloud') {
      isLoggingEnabled = false;
      const analyticsContainers =
        Meteor.settings.public.analyticsControl.containers;
      if (Meteor.settings.public.analyticsControl.loggingEnabled
          && (analyticsContainers.indexOf(type) > -1)) {
        isLoggingEnabled = true;
      }
      return isLoggingEnabled;
    }

  };

  return _public;

})();
