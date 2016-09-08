/* global window */
/* eslint-disable react/prefer-es6-class */

import React from 'react';
import RcPagination from 'rc-pagination';
import { _ } from 'meteor/underscore';

const Pagination = React.createClass({

  propTypes: {
    searchMetadata: React.PropTypes.object.isRequired,
    searchParams: React.PropTypes.object.isRequired,
    handleSearchParamsUpdate: React.PropTypes.func.isRequired,
  },

  onChange(page) {
    const newSearchParams = _.extend({}, this.props.searchParams);
    newSearchParams.currentPage = page;
    this.props.handleSearchParamsUpdate(newSearchParams);
    window.scroll(0, 0);
  },

  totalResults() {
    return this.props.searchMetadata.totalResults
        ? this.props.searchMetadata.totalResults : 0;
  },

  render() {
    return (
      <div className="search-pagination">
        <RcPagination
          current={this.props.searchParams.currentPage}
          onChange={this.onChange}
          total={this.totalResults()}
          pageSize={this.props.searchParams.resultsPerPage}
        />
      </div>
    );
  },

});

export default Pagination;
