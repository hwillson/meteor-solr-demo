/* eslint-disable react/prefer-es6-class */

import React from 'react';

import SearchLogger from '../../../utility/search_logger';
import DateFormatter from '../../../utility/date_formatter';
import SearchFacetUtils from '../../../api/search/search_facet_utils';

const SearchResult = React.createClass({

  propTypes: {
    result: React.PropTypes.object,
    currentPage: React.PropTypes.number.isRequired,
    searchMetadata: React.PropTypes.object.isRequired,
  },

  logSearchResult(event) {
    SearchLogger.logSearchResult(
      event.target.href,
      this.props.currentPage,
      this.props.searchMetadata.loggedSearchId
    );
  },

  /**
   * Something is causing certain content blocks to have their whitespace
   * converted to &nbsp;'s. This likely has to do with the encoding of some
   * content when indexing via Solr. For now converting all space values to
   * normal spaces fixes the issue.
   */
  cleanSpaces(content) {
    let cleanContent = '';
    if (content) {
      cleanContent = content.replace(/(?! )\s/g, ' ');
    }
    return cleanContent;
  },

  renderContent() {
    return {
      __html: this.cleanSpaces(this.props.result.content),
    };
  },

  render() {
    const title = this.cleanSpaces(this.props.result.title);
    const resultUrl = encodeURI(this.props.result.returnUrl);
    return (
      <li className="search-result">
        <div className="search-result-title">
          <a
            href={resultUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={this.logSearchResult}
            className={this.props.result.doctype}
          >
            {title}
          </a>
        </div>
        <div className="search-result-description">
          <span dangerouslySetInnerHTML={this.renderContent()} />
        </div>
        <div className="search-metadata">
          {SearchFacetUtils.getCustomValue('doctype', this.props.result.doctype)}
          &nbsp;| {DateFormatter.format(this.props.result.lastmodified)}
        </div>
      </li>
    );
  },

});

export default SearchResult;
