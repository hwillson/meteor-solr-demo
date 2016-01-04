WelcomeContent = React.createClass({

  render() {
    return (
      <div className="welcome-content">
        <h1>Meteor Solr Search Demo</h1>
        <p>
          Welcome to the Meteor Solr search demo!
        </p>
        <div className="welcome-get-started clearfix">
          <div className="pull-left">
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
          <li>TODO</li>
        </ul>
      </div>
    );
  }

});
