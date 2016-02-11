// Schema
App.schemas.loggedSearchResult = new SimpleSchema({
  loggedSearchId: {
    type: String,
    label: 'Logged Search ID'
  },
  username: {
    type: String,
    label: 'Username',
    optional: true
  },
  documentUrl: {
    type: String,
    label: 'Document URL'
  },
  page: {
    type: Number,
    label: 'Result Page'
  }
});

// Collection
App.collections.loggedSearchResults =
  new Mongo.Collection('logged_search_results');
App.collections.loggedSearchResults.attachSchema(
  App.schemas.loggedSearchResult
);
App.collections.loggedSearchResults.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

// Methods
App.methods.loggedSearchResult = {
  create: new ValidatedMethod({
    name: 'App.methods.loggedSearchResult.create',
    validate: App.schemas.loggedSearchResult.validator(),
    run(loggedSearchResult) {
      if (Meteor.user()) {
        loggedSearchResult.username = Meteor.user().username;
      }
      App.collections.loggedSearchResults.insert(loggedSearchResult);
    }
  })
};
