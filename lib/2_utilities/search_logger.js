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
        // TODO - keeping for now; will remove when happy with GA single cat
        // tracking
        // if (searchParams.fields) {
        //   let fields = '';
        //   Object.keys(searchParams.fields).forEach((fieldName) => {
        //     fields += `${fieldName}:${searchParams.fields[fieldName]},`;
        //   });
        //   fields = fields.slice(0, -1);
        //   if (fields) {
        //     path += `&cat=${fields}`;
        //   }
        // }
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
        const loggedSearchId = App.collections.loggedSearches.insert({
          username,
          keywords,
          fields,
          numberOfResults
        });
        return loggedSearchId;
      }
    },

    isLoggingEnabled(type = 'cloud') {
      isLoggingEnabled = false;
      if (Meteor.settings.public.analyticsControl.loggingEnabled
          && (Meteor.settings.public.analyticsControl.container === type)) {
        isLoggingEnabled = true;
      }
      return isLoggingEnabled;
    }

  };

  return _public;

})();
