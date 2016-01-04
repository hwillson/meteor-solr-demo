ResultsCount = React.createClass({

  propTypes: {
    searchMetadata: React.PropTypes.object.isRequired
  },

  totalResultsLabel() {
    let totalResults = this.props.searchMetadata.totalResults;
    if (!totalResults) {
      totalResults = 0;
    }
    let totalResultsLabel = totalResults + ' results found.';
    if (totalResults === 1) {
      totalResultsLabel = '1 result found.';
    }
    return totalResultsLabel;
  },

  render() {
    return (
      <div className="results-count">
        {this.totalResultsLabel()}
      </div>
    );
  }

});
