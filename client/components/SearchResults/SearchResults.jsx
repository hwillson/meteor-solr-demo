SearchResults = React.createClass({

  propTypes: {
    searchResults: React.PropTypes.array.isRequired,
    resultsPerPage: React.PropTypes.number,
    currentPage: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      resultsPerPage: 10,
      currentPage: 1
    };
  },

  resultsStartCount() {
    return ResultCount.calculateStartCount(
      this.props.currentPage, this.props.resultsPerPage
    );
  },

  renderSearchResults() {
    return this.props.searchResults.map((searchResult) => {
      return <SearchResult key={searchResult._id} result={searchResult} />;
    });
  },

  render() {
    return (
      <div className="search-results">
        <ol start={this.resultsStartCount()}>
          {this.renderSearchResults()}
        </ol>
      </div>
    );
  }

});
