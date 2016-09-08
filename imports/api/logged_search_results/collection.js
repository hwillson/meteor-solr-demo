import { Mongo } from 'meteor/mongo';
import LoggedSearchResultSchema from './schema';

const LoggedSearchResults = new Mongo.Collection('logged_search_results');
LoggedSearchResults.attachSchema(LoggedSearchResultSchema);
LoggedSearchResults.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default LoggedSearchResults;
