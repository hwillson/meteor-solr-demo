import LoggedSearches from '../logged_searches/collection';
import LoggedSearchResults from '../logged_search_results/collection';

const SearchSummary = (() => {
  const myPublic = {};
  const myPrivate = {};

  myPublic.init = (username, startTime, stopTime) => {
    myPrivate.username = username;
    myPrivate.startTime = startTime;
    myPrivate.stopTime = stopTime;
  };

  // Generate a search summary by extracting logged search information for a
  // specific user, within a specific timeframe. Search summaries are made up
  // of comma separated lists of keywords, fields and clicked on search
  // result links.
  myPublic.generateSummaryForUser = () => {
    let summary;
    if (myPrivate.username && myPrivate.startTime && myPrivate.stopTime) {
      const searches = myPrivate.getUserSearches();
      if (searches.count()) {
        const keywordAndFieldSummary =
          myPrivate.buildKeywordAndFieldSummary(searches);
        const results = myPrivate.getUserResultLinks();
        const resultLinkSummary = myPrivate.buildResultLinkSummary(results);
        summary = {
          username: myPrivate.username,
          keywords: keywordAndFieldSummary.keywords,
          fields: keywordAndFieldSummary.fields,
          resultLinks: resultLinkSummary,
          timestamp: myPrivate.stopTime,
        };
      }
    }
    return summary;
  };

  // Get all searches logged for a specific user, within the specified
  // timeframe.
  myPrivate.getUserSearches = () => (
    LoggedSearches.find({
      username: myPrivate.username,
      timestamp: {
        $gte: myPrivate.startTime,
        $lt: myPrivate.stopTime,
      },
    })
  );

  // Build keyword and field comma separated search summaries.
  myPrivate.buildKeywordAndFieldSummary = (searches) => {
    const keywords = [];
    const fields = [];
    searches.forEach((search) => {
      if (keywords.indexOf(search.keywords) === -1) {
        keywords.push(search.keywords);
      }
      const combinedFields = search.fields.join(', ');
      if ((combinedFields.length > 0)
          && (fields.indexOf(combinedFields) === -1)) {
        fields.push(combinedFields);
      }
    });
    return {
      keywords: keywords.join(', '),
      fields: fields.join(', '),
    };
  };

  // Get all search result links clicked on by a specific user, within the
  // specified timeframe.
  myPrivate.getUserResultLinks = () => (
    LoggedSearchResults.find({
      username: myPrivate.username,
      timestamp: {
        $gte: myPrivate.startTime,
        $lt: myPrivate.stopTime,
      },
    })
  );

  // Build search result link summaries.
  myPrivate.buildResultLinkSummary = (results) => {
    const resultLinks = [];
    results.forEach((result) => {
      if (resultLinks.indexOf(result.documentUrl) === -1) {
        resultLinks.push(result.documentUrl);
      }
    });
    return resultLinks.join(', ');
  };

  return myPublic;
})();

export default SearchSummary;
