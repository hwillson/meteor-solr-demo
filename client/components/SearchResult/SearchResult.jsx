SearchResult = React.createClass({

  propTypes: {
    result: React.PropTypes.object,
    currentPage: React.PropTypes.number.isRequired,
    searchMetadata: React.PropTypes.object.isRequired
  },

  logSearchResult(event) {
    App.utilities.searchLogger.logSearchResult(
      event.target.href,
      this.props.currentPage,
      this.props.searchMetadata.loggedSearchId
    );
  },

  renderContent() {
    return {
      __html: this.props.result.content
    };
  },

  render() {
    const resultUrl = encodeURI(this.props.result.returnUrl);
    return (
      <li className="search-result">
        <div className="search-result-title">
          <a href={resultUrl} target="_blank"
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
