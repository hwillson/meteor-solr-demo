SearchResult = React.createClass({

  propTypes: {
    result: React.PropTypes.object
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
          <a href="#">{this.props.result.title}</a>
        </div>
        <div className="search-result-description">
          <span dangerouslySetInnerHTML={this.renderContent()} />
        </div>
        <div className="search-metadata">
          Last modified: {DateFormatter.format(this.props.result.lastmodified)}
        </div>
      </li>
    );
  }

});
