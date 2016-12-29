import { Mongo } from 'meteor/mongo';

import LoggedSearchSchema from './schema';

const LoggedSearches = new Mongo.Collection('logged_searches');
LoggedSearches.attachSchema(LoggedSearchSchema);

LoggedSearches.removeSearchesOlderThan = (cutoffDate) => {
  if (cutoffDate) {
    this.remove({
      timestamp: {
        $lt: cutoffDate,
      },
    });
  }
};

LoggedSearches.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export default LoggedSearches;
