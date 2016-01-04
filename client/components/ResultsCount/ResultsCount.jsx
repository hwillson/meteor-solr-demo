ResultsCount = React.createClass({

  propTypes: {
    searchMetadata: React.PropTypes.object.isRequired,
    resultsPerPage: React.PropTypes.number,
    currentPage: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      resultsPerPage: 10,
      currentPage: 1
    };
  },

  totalResultsLabel() {
    let totalResultsLabel = '';
    if (this.props.searchMetadata.totalResults > this.props.resultsPerPage) {
      totalResultsLabel = ' of ' + this.props.searchMetadata.totalResults;
    }
    return totalResultsLabel;
  },

  resultsStartCount() {
    return ResultCount.calculateStartCount(
      this.props.currentPage, this.props.resultsPerPage
    );
  },

  resultsStopCount() {
    const currentPage = this.props.currentPage;
    const totalResults = this.props.searchMetadata.totalResults;
    const resultsPerPage = this.props.resultsPerPage;
    let resultsStopCount = 0;
    if ((currentPage * resultsPerPage) > totalResults) {
      resultsStopCount = totalResults;
    } else {
      resultsStopCount = currentPage * resultsPerPage;
    }
    return resultsStopCount;
  },

  render() {
    return (
      <div className="results-count">
        Showing results {this.resultsStartCount()} to {this.resultsStopCount()}
        {this.totalResultsLabel()}
        &nbsp;for <strong>{this.props.searchMetadata.keywords}</strong>
      </div>
    );
  }

});
