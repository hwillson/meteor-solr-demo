WelcomeContent = React.createClass({

  render() {
    return (
      <div className="welcome-content">
        <h1>Meteor Solr Search Demo</h1>
        <p>
          Welcome to the Meteor Solr search demo!
        </p>
        <div className="welcome-get-started clearfix">
          <div className="pull-left hidden-xs">
            <i className="fa fa-info-circle fa-2x"></i>
          </div>
          <div className="pull-left welcome-get-started-msg">
            To get started, enter your search keywords into the box above.
          </div>
        </div>
        <h3>The Details</h3>
        <p>This demo shows how Meteor can be used with Solr to provide a quick, simple, easy to use/maintain search based application.</p>
        <p>This application demonstrates the following:</p>
        <ul>
          <li>Meteor based single page search application</li>
          <li>Searches automatically as you type</li>
          <li>Provides Solr facet handling capabilities through custom facet UI widgets</li>
          <li>Demonstrates single level facet refinements through sample Document Type, Date and Author facet widgets</li>
          <li>Demonstrates multi level facet refinements through a sample Categories facet widget</li>
          <li>Search can be refined by each facet independently, with each facet keeping track of its current state (making it easy to unrefine)</li>
          <li>Tracks general user search actions (search keywords used, number of results found, results selected, page of result selected, facet refinement selected, etc.) via Mongo</li>
        </ul>
      </div>
    );
  }

});
