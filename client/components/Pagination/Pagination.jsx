Pagination = React.createClass({

  propTypes: {
    searchMetadata: React.PropTypes.object.isRequired,
    currentPage: React.PropTypes.number
  },

  mixins: [ReactMeteorData],

  getDefaultProps() {
    return {
      currentPage: 1
    };
  },

  componentWillMount() {
    this.setState({ current: this.props.currentPage });
  },

  onChange(page) {
    this.setState({
      current: page
    });
    Session.set('currentPage', page);
  },

  getMeteorData() {
    return {
      currentPage: Session.get('currentPage')
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
          total={this.totalResults()}
        />
      </div>
    );
  }

});
