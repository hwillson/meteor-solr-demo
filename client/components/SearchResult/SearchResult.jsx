SearchResult = React.createClass({

  propTypes: {
    result: React.PropTypes.object,
    currentPage: React.PropTypes.number.isRequired,
    searchMetadata: React.PropTypes.object.isRequired
  },

  logSearchResult(event) {
    if (App.utilities.searchLogger.isLoggingEnabled('database')) {
      App.methods.loggedSearchResult.create.call({
        loggedSearchId: this.props.searchMetadata.loggedSearchId,
        documentUrl: event.target.href,
        page: this.props.currentPage
      });
    }
  },

  renderContent() {
    return {
      __html: this.props.result.content
    };
  },

  render() {
    return (
      <li className="search-result">
        <div className="search-result-title">
          <a href={this.props.result.returnUrl} target="_blank"
            onClick={this.logSearchResult}
          >
            {this.props.result.title}
          </a>
        </div>
        <div className="search-result-description">
          <span dangerouslySetInnerHTML={this.renderContent()} />
        </div>
        <div className="search-metadata">
          {SearchFacetUtils.getCustomValue('doctype', this.props.result.doctype)}
          &nbsp;| {DateFormatter.format(this.props.result.lastmodified)}
        </div>
      </li>
    );
  }

});
