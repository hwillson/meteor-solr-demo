Pagination = React.createClass({

  propTypes: {
    searchMetadata: React.PropTypes.object.isRequired,
    searchParams: React.PropTypes.object.isRequired,
    handleSearchParamsUpdate: React.PropTypes.func.isRequired
  },

  onChange(page) {
    const newSearchParams = this.props.searchParams;
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
        <RcPagination current={this.props.searchParams.currentPage}
          onChange={this.onChange}
          total={this.totalResults()}
          pageSize={this.props.searchParams.resultsPerPage}
        />
      </div>
    );
  }

});
