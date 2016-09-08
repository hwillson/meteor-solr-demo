/* global window */
/* eslint-disable react/prefer-es6-class */

import React from 'react';
import { _ } from 'meteor/underscore';

import SearchFacetUtils from '../../../api/search/search_facet_utils';

const SearchFacet = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    field: React.PropTypes.string.isRequired,
    values: React.PropTypes.array.isRequired,
    searchParams: React.PropTypes.object.isRequired,
    handleSearchParamsUpdate: React.PropTypes.func.isRequired,
  },

  refineByFacet(event) {
    event.preventDefault();
    const selectedFacet = event.target.getAttribute('data-value');
    const newSearchParams = _.extend({}, this.props.searchParams);
    newSearchParams.fields[this.props.field] = selectedFacet;
    newSearchParams.currentPage = 1;
    newSearchParams.lastAddedFieldName = this.props.field;
    this.props.handleSearchParamsUpdate(newSearchParams);
    window.scroll(0, 0);
  },

  unrefineFacet(event) {
    event.preventDefault();
    const newSearchParams = _.extend({}, this.props.searchParams);
    delete newSearchParams.fields[this.props.field];
    newSearchParams.lastAddedFieldName = null;
    this.props.handleSearchParamsUpdate(newSearchParams);
  },

  renderFacetLink(name) {
    const customName = SearchFacetUtils.getCustomValue(this.props.field, name);
    let facetLink;
    if (this.props.searchParams.fields[this.props.field]) {
      facetLink = (
        <span className="selected">{customName}</span>
      );
    } else {
      facetLink = (
        <a href="#facet" onClick={this.refineByFacet} data-value={name}>
          {customName}
        </a>
      );
    }
    return facetLink;
  },

  renderFacetContent() {
    let facetContent;
    if (this.props.values && (this.props.values.length > 0)) {
      const facetValues = [];
      const selectedFacet = this.props.searchParams.fields[this.props.field];
      this.props.values.forEach((value) => {
        if (!selectedFacet || (selectedFacet === value.name)) {
          let count = '';
          if (value.count) {
            count = `(${value.count})`;
          }
          facetValues.push(
            <li key={value.name}>
              {this.renderFacetLink(value.name)}
              &nbsp;{count}
            </li>
          );
        }
      });
      facetContent = (<ul>{facetValues}</ul>);
    } else {
      facetContent = (<span>No results found.</span>);
    }
    return facetContent;
  },

  renderResetLink() {
    let resetLink;
    if (this.props.searchParams.fields[this.props.field]) {
      resetLink = (
        <div className="reset">
          <button
            className="btn btn-xs btn-danger"
            onClick={this.unrefineFacet}
          >
            <i className="fa fa-times-circle" /> RESET
          </button>
        </div>
      );
    }
    return resetLink;
  },

  render() {
    return (
      <div className="search-facet panel panel-default">
        <div className="panel-heading clearfix">
          <div className="pull-left">
            <strong>{this.props.name}</strong>
          </div>
          <div className="pull-right">
            {this.renderResetLink()}
          </div>
        </div>
        <div className="panel-body">
          {this.renderFacetContent()}
        </div>
      </div>
    );
  },

});

export default SearchFacet;
