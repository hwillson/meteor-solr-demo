import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';

import LoggedSearchResultSchema from './schema';
import LoggedSearchResults from './collection';

const logSearchResult = new ValidatedMethod({
  name: 'logSearchResult',
  validate: LoggedSearchResultSchema.validator(),
  run(loggedSearchResult) {
    const enhancedSearchResult = loggedSearchResult;
    if (Meteor.user()) {
      enhancedSearchResult.username = Meteor.user().username;
    }
    enhancedSearchResult.timestamp = new Date();
    LoggedSearchResults.insert(enhancedSearchResult);
  },
});

export default logSearchResult;
