const SearchSummary = (() => {

  const _public = {};
  const _private = {};

  _public.init = (username, startTime, stopTime) => {
    _private.username = username;
    _private.startTime = startTime;
    _private.stopTime = stopTime;
  };

  // Generate a search summary by extracting logged search information for a
  // specific user, within a specific timeframe. Search summaries are made up
  // of comma separated lists of keywords, fields and clicked on search
  // result links.
  _public.generateSummaryForUser = () => {
    let summary;
    if (_private.username && _private.startTime && _private.stopTime) {
      const searches = _private.getUserSearches();
      if (searches.count()) {
        const keywordAndFieldSummary =
          _private.buildKeywordAndFieldSummary(searches);
        const results = _private.getUserResultLinks();
        const resultLinkSummary = _private.buildResultLinkSummary(results);
        summary = {
          username: _private.username,
          keywords: keywordAndFieldSummary.keywords,
          fields: keywordAndFieldSummary.fields,
          resultLinks: resultLinkSummary,
          timestamp: _private.stopTime,
        };
      }
    }
    return summary;
  };

  // Get all searches logged for a specific user, within the specified
  // timeframe.
  _private.getUserSearches = () => {
    return App.collections.loggedSearches.find({
      username: _private.username,
      timestamp: {
        $gte: _private.startTime,
        $lt: _private.stopTime,
      },
    });
  };

  // Build keyword and field comma separated search summaries.
  _private.buildKeywordAndFieldSummary = (searches) => {
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
      fields: fields.join(', ')
    };
  };

  // Get all search result links clicked on by a specific user, within the
  // specified timeframe.
  _private.getUserResultLinks = () => {
    return App.collections.loggedSearchResults.find({
      username: _private.username,
      timestamp: {
        $gte: _private.startTime,
        $lt: _private.stopTime,
      },
    });
  };

  // Build search result link summaries.
  _private.buildResultLinkSummary = (results) => {
    const resultLinks = [];
    results.forEach((result) => {
      if (resultLinks.indexOf(result.documentUrl) === -1) {
        resultLinks.push(result.documentUrl);
      }
    });
    return resultLinks.join(', ');
  };

  return _public;
}());

App.utilities.searchSummary = SearchSummary;
