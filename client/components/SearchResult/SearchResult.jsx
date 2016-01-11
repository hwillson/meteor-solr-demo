SearchResult = React.createClass({

  propTypes: {
    result: React.PropTypes.object
  },

  render() {
    return (
      <li className="search-result">
        <div className="search-result-title">
          <a href="#">{this.props.result.title}</a>
        </div>
        <div className="search-result-description">
          {this.props.result.content}
        </div>
        <div className="search-metadata">
          Last modified: {DateFormatter.format(this.props.result.lastmodified)}
        </div>
      </li>
    );
  }

});
