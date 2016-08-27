const SearchSummaryService = (() => {
  const _public = {};
  const _private = {};

  // Send a search summary to the specified external reporting system for each
  // user that has had logged searches made within specified timeframe.
  _public.sendSearchSummariesToReportingSystem = (startTime, stopTime) => {
    if (startTime && stopTime) {
      const usernames = _private.getLoggedSearchUsernames(startTime, stopTime);
      const searchSummaries = [];
      usernames.forEach((username) => {
        App.utilities.searchSummary.init(username, startTime, stopTime);
        const summary = App.utilities.searchSummary.generateSummaryForUser();
        if (summary) {
          _private.postSummaryToReportingSystem(summary);
        }
      });
    }
  };

  // Load all unique usernames associated with searches made within the
  // specified timeframe.
  _private.getLoggedSearchUsernames = (startTime, stopTime) => {
    const usernames = [];
    App.collections.loggedSearches.find({
      timestamp: {
        $gte: startTime,
        $lt: stopTime,
      },
    }).forEach((search) => {
      if (usernames.indexOf(search.username) === -1) {
        usernames.push(search.username);
      }
    });
    return usernames;
  };

  // Post a user's search summary to the external reporting system web service
  // endpoint.
  _private.postSummaryToReportingSystem = (summary) => {
    if (summary) {
      console.log('Sent summary!', summary);
      // TODO - disabling until the test endpoint is ready.
      // const url = Meteor.settings.private.analytics.jobs.export.endpointUrl;
      // HTTP.post(url, { data: summary });
    }
  };

  return _public;
}());

App.utilities.searchSummaryService = SearchSummaryService;
