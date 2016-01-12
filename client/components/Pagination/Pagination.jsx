Pagination = React.createClass({

  propTypes: {
    searchMetadata: React.PropTypes.object.isRequired,
    currentPage: React.PropTypes.number,
    resultsPerPage: React.PropTypes.number
  },

  mixins: [ReactMeteorData],

  getDefaultProps() {
    return {
      currentPage: 1,
      resultsPerPage: 10
    };
  },

  componentWillMount() {
    this.setState({ current: this.props.currentPage });
  },

  onChange(page) {
    this.setState({
      current: page
    });
    this.data.searchParams.currentPage = page;
    Session.set('searchParams', this.data.searchParams);
    window.scroll(0, 0);
  },

  getMeteorData() {
    return {
      searchParams: Session.get('searchParams')
    };
  },

  totalResults() {
    return this.props.searchMetadata.totalResults
        ? this.props.searchMetadata.totalResults : 0;
  },

  render() {
    return (
      <div className="search-pagination">
        <RcPagination current={this.state.current} onChange={this.onChange}
          total={this.totalResults()} pageSize={this.props.resultsPerPage}
        />
      </div>
    );
  }

});
