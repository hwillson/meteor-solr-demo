/* global window */
/* eslint-disable react/prefer-es6-class */

import React from 'react';
import { _ } from 'meteor/underscore';

import SearchSort from '../../../api/search/search_sort';

const Sorting = React.createClass({

  propTypes: {
    searchParams: React.PropTypes.object.isRequired,
    handleSearchParamsUpdate: React.PropTypes.func.isRequired,
  },

  updateSearchParams(event) {
    const newSearchParams = _.extend({}, this.props.searchParams);
    newSearchParams.sorting = event.target.value;
    newSearchParams.currentPage = 1;
    this.props.handleSearchParamsUpdate(newSearchParams);
    window.scroll(0, 0);
  },

  renderSortOptions() {
    const sortOptions = [
      {
        label: 'Most relevant first',
        value: SearchSort.lookup.relevancy.id,
      },
      {
        label: 'Newest first',
        value: SearchSort.lookup.lastModifiedDesc.id,
      },
      {
        label: 'Oldest first',
        value: SearchSort.lookup.lastModifiedAsc.id,
      },
    ];
    const renderedOptions = [];
    sortOptions.forEach((option) => {
      renderedOptions.push(
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      );
    });
    return renderedOptions;
  },

  render() {
    return (
      <div className="sorting">
        <select
          className="form-control"
          onChange={this.updateSearchParams}
          value={this.props.searchParams.sorting}
        >
          {this.renderSortOptions()}
        </select>
      </div>
    );
  },

});

export default Sorting;
