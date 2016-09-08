/* eslint-disable react/prefer-es6-class */

import React from 'react';

import ResultCount from '../../../api/search/result_count';
import SearchResult from '../SearchResult/SearchResult';

const SearchResults = React.createClass({

  propTypes: {
    searchResults: React.PropTypes.array.isRequired,
    searchParams: React.PropTypes.object.isRequired,
    searchMetadata: React.PropTypes.object.isRequired,
  },

  resultsStartCount() {
    return ResultCount.calculateStartCount(
      this.props.searchParams.currentPage,
      this.props.searchParams.resultsPerPage
    );
  },

  renderSearchResults() {
    return this.props.searchResults.map((searchResult) => (
      <SearchResult
        key={searchResult._id}
        result={searchResult}
        currentPage={this.props.searchParams.currentPage}
        searchMetadata={this.props.searchMetadata}
      />
    ));
  },

  render() {
    return (
      <div className="search-results">
        <ol start={this.resultsStartCount()}>
          {this.renderSearchResults()}
        </ol>
      </div>
    );
  },

});

export default SearchResults;
