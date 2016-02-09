SearchResults = React.createClass({

  propTypes: {
    searchResults: React.PropTypes.array.isRequired,
    searchParams: React.PropTypes.object.isRequired
  },

  resultsStartCount() {
    return ResultCount.calculateStartCount(
      this.props.searchParams.currentPage,
      this.props.searchParams.resultsPerPage
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
