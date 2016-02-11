// Schema
App.schemas.loggedSearch = new SimpleSchema({
  username: {
    type: String,
    label: 'Username',
    optional: true
  },
  keywords: {
    type: String,
    label: 'Keywords'
  },
  fields: {
    type: [String],
    label: 'Fields',
    optional: true
  },
  numberOfResults: {
    type: Number,
    label: 'Nuber of Results'
  }
});

// Collection
App.collections.loggedSearches = new Mongo.Collection('logged_searches');
App.collections.loggedSearches.attachSchema(App.schemas.loggedSearch);
App.collections.loggedSearches.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
