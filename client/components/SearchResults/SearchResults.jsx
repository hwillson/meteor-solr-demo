SearchResults = React.createClass({

  propTypes: {
    searchResults: React.PropTypes.array.isRequired
  },

  renderSearchResults() {
    return this.props.searchResults.map((searchResult) => {
      return <SearchResult key={searchResult._id} name={searchResult.name} />;
    });
  },

  render() {
    return (
      <div className="search-results">
        <ul>
          {this.renderSearchResults()}
        </ul>
      </div>
    );
  }

});
