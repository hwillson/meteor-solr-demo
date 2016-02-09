ResultsCount = React.createClass({

  propTypes: {
    searchMetadata: React.PropTypes.object.isRequired,
    searchParams: React.PropTypes.object.isRequired
  },

  totalResultsLabel() {
    let totalResultsLabel = '';
    if (this.props.searchMetadata.totalResults >
        this.props.searchParams.resultsPerPage) {
      totalResultsLabel = ' of ' + this.props.searchMetadata.totalResults;
    }
    return totalResultsLabel;
  },

  resultsStartCount() {
    return ResultCount.calculateStartCount(
      this.props.searchParams.currentPage,
      this.props.searchParams.resultsPerPage
    );
  },

  resultsStopCount() {
    const currentPage = this.props.searchParams.currentPage;
    const totalResults = this.props.searchMetadata.totalResults;
    const resultsPerPage = this.props.searchParams.resultsPerPage;
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
