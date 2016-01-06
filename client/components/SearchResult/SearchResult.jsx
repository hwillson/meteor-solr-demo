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
          {this.props.result.description}
        </div>
        <div className="search-metadata">
          Date created: {DateFormatter.format(this.props.result.date_created)}
        </div>
      </li>
    );
  }

});
