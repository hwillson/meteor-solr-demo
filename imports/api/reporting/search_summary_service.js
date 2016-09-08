import SearchSummary from './search_summary';
import LoggedSearches from '../logged_searches/collection';

const SearchSummaryService = (() => {
  const publicApi = {};
  const privateApi = {};

  // Send a search summary to the specified external reporting system for each
  // user that has had logged searches made within specified timeframe.
  publicApi.sendSearchSummariesToReportingSystem = (startTime, stopTime) => {
    if (startTime && stopTime) {
      const usernames = privateApi.getLoggedSearchUsernames(startTime, stopTime);
      usernames.forEach((username) => {
        SearchSummary.init(username, startTime, stopTime);
        const summary = SearchSummary.generateSummaryForUser();
        if (summary) {
          privateApi.postSummaryToReportingSystem(summary);
        }
      });
    }
  };

  // Load all unique usernames associated with searches made within the
  // specified timeframe.
  privateApi.getLoggedSearchUsernames = (startTime, stopTime) => {
    const usernames = [];
    LoggedSearches.find({
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
  privateApi.postSummaryToReportingSystem = (summary) => {
    if (summary) {
      console.log('Sent summary!', summary);
      // TODO - disabling until the test endpoint is ready.
      // const url = Meteor.settings.private.analytics.jobs.export.endpointUrl;
      // HTTP.post(url, { data: summary });
    }
  };

  return publicApi;
})();

export default SearchSummaryService;
