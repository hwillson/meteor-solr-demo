# Meteor + Solr Search Application Demo

[![Stories in Ready](https://badge.waffle.io/hwillson/meteor-solr-demo.png?label=ready&title=Ready)](https://waffle.io/hwillson/meteor-solr-demo)

This project demonstrates one approach for using [Solr](http://lucene.apache.org/solr/) with [Meteor](https://meteor.com). It provides the following functionality:

- Meteor based single page search application
- Searches automatically as you type
- Provides Solr facet handling capabilities through custom facet UI widgets
- Demonstrates single level facet refinements through sample Document Type, Date,  Author, Location, Organization and Related Terms facet widgets
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

- [solrconfig.xml](https://raw.githubusercontent.com/hwillson/meteor-solr-demo/master/public/solr/solrconfig.xml)
- [schema.xml](https://raw.githubusercontent.com/hwillson/meteor-solr-demo/master/public/solr/schema.xml)

**Running the Search Application**

1. `git clone https://github.com/hwillson/meteor-solr-demo.git`
2. Update `deploy/settings.json` with your Solr install details.
3. Run `meteor --settings=deploy/settings.json` in the root of your project, and access the search at http://localhost:3000.

## Search Analytics

Search analytics logging can be turned on/off in the `deploy/settings.json` file:

    {
      "public": {
        "analyticsControl": {
          "loggingEnabled": true
        }
      }
    }

The following analytics are captured for each user:
- Username of user making the search
- Search keywords used
- If the search is a facet refinement, the name of the field used to refine
- If the search is a facet refinement, the value of the field used to refine
- Total number of search results from this search
- Clicked on search result URLs
- Page clicked on search result was found

Search analytics can be captured in one of two ways:
1. In a Mongo database.
2. In a supported 3rd party cloud based analytics system.

Define the analytics data capture approach in the `deploy/settings.json` file.

Mongo DB:

    {
      "public": {
        "analyticsControl": {
          "container": "database"
        }
      }
    }

Cloud analytics system:

    {
      "public": {
        "analyticsControl": {
          "container": "cloud"
        }
      }
    }

### Search Analytics: Database (Mongo)

Using this approach search analytics are captured and stored in the Meteor provided Mongo DB instance. These analytics are only captured for now; this POC does not provide a way to view the captured details (data can be exported from Mongo as needed).

Searches made are stored in the Mongo DB `logged_searches` collection. Search results selected are stored in the Mongo DB `logged_search_results` collection, along with a search record ID to associate selected results back to the search keywords and fields used.

### Search Analytics: 3rd Party Analytics

Using this approach search analytics are fired up to a 3rd party cloud based analytics system. This approach uses the [okgrow:analytics](https://atmospherejs.com/okgrow/analytics) package. Follow that packages configuration instructions to wire up your analytics system of choice. This project assumes a default of Google Analytics (but can be easily changed as needed).

Cloud analytics settings are configured in the `deploy/settings.json` file:

    {
      "public": {
        "analyticsSettings": {
          "Google Analytics": {
            "trackingId": "Your tracking ID"
          }
        }
      }
    }
