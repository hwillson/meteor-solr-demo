Pagination = React.createClass({

  propTypes: {
    searchMetadata: React.PropTypes.object.isRequired
  },

  // showPages() {
  //   const resultsPerPage = 10;
  //   const totalResults =
  //     (this.props.searchMetadata.totalResults
  //       ? this.props.searchMetadata.totalResults : 0);
  //   let pages = [];
  //   if (totalResults <= resultsPerPage) {
  //     pages = [1];
  //   } else {
  //     for (let i = 1; i <= Math.floor(totalResults / resultsPerPage); i++) {
  //       pages.push(i);
  //     }
  //     if (totalResults % resultsPerPage) {
  //       pages.push(pages[pages.length - 1] + 1);
  //     }
  //   }
  //   return pages.map((page) => {
  //     return <PaginationPage key={page} page={page} />;
  //   });
  // },

  getInitialState() {
    return {
      current: 1
    };
  },

  onChange(page) {
    PowerSearch.search('*', { page });
    this.setState({
      current: page
    });
  },

  totalResults() {
    return this.props.searchMetadata.totalResults
        ? this.props.searchMetadata.totalResults : 0;
  },

  render() {
    return (
      <div className="search-pagination">
        <RcPagination current={this.state.current} onChange={this.onChange}
          total={this.totalResults()}
        />
      </div>
    );
  }

});
