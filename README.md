# Meteor + Solr Search Application Demo

This project demonstrates one approach for using [Solr](http://lucene.apache.org/solr/) with [Meteor](https://meteor.com). It provides the following functionality:

- Meteor based single page search application
- Searches automatically as you type
- Provides Solr facet handling capabilities through custom facet UI widgets
- Demonstrates single level facet refinements through sample Document Type, Date and Author facet widgets
- Demonstrates multi level facet refinements through a sample Categories facet widget
- Search can be refined by each facet independently, with each facet keeping track of its current state (making it easy to unrefine)
- Tracks general user search actions (search keywords used, number of results found, results selected, page of result selected, facet refinement selected, etc.) via Mongo

### Example: Search Home
![Search home](https://raw.githubusercontent.com/hwillson/meteor-solr-demo/master/public/images/search_home_example.png "Search home")

### Example: Search Results
![Search results](https://raw.githubusercontent.com/hwillson/meteor-solr-demo/master/public/images/search_results_example.png "Search results")

## Technical Details

This demo is built using Meteor for all client/server code, with Solr handling the backend search functionality, and MongoDB holding all search analytics. [React](https://facebook.github.io/react/) is used to render all Meteor based view components (instead of Blaze). Solr integration is wired using the [meteorhacks:search-source](https://atmospherejs.com/meteorhacks/search-source) Meteor package, alongside the [solr-client](https://www.npmjs.com/package/solr-client) npm package.

## Demo Installation

**Solr Setup / Config**

Here are the sample Solr config and schema files used by this demo:

- [solrconfig.xml](https://raw.githubusercontent.com/hwillson/meteor-solr-demo/master/solr/solrconfig.xml)
- [schema.xml](https://raw.githubusercontent.com/hwillson/meteor-solr-demo/master/solr/schema.xml)

**Running the Search Application**

1. git clone https://github.com/hwillson/meteor-solr-demo.git
2. Update `lib/models/search_config.js` with your Solr install details.
3. Run `meteor` in the root of your project, and access the search at http://localhost:3000.

## TODO

- There is a known bug in the categories facet that doesn't properly refresh the hierarchical tree properly when drilling down.
- Wire search analytics tracking up.
- Wire up search keyword type ahead functionality using the [Solr Suggester](https://cwiki.apache.org/confluence/display/solr/Suggester).
- Look into leveraging the [React Container Pattern](https://voice.kadira.io/using-meteor-data-and-react-with-meteor-1-3-13cb0935dedb).
