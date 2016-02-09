SearchBar = React.createClass({

  propTypes: {
    searchParams: React.PropTypes.object.isRequired,
    handleSearchParamsUpdate: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      keywords: ''
    };
  },

  componentWillMount() {
    this.setSearchKeywords = _.debounce((keywords) => {
      const newSearchParams = this.props.searchParams;
      newSearchParams.keywords = keywords;
      this.props.handleSearchParamsUpdate(newSearchParams);
    }, 500);
  },

  performSearch(event) {
    const keywords = event.target.value;
    this.setSearchKeywords(keywords);
    this.setState({ keywords });
  },

  resetSearch(event) {
    event.preventDefault();
    this.props.handleSearchParamsUpdate(null);
    this.refs.keywords.focus();
    this.setState({ keywords: '' });
  },

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
  },

  render() {
    return (
      <div className="search-bar clearfix">
        <form className="navbar-form navbar-left pull-right"
          role="search" onSubmit={this.handleSubmit}
        >
          <div className="input-group">
            <input ref="keywords" className="form-control"
              placeholder="Search keywords" autoFocus
              onChange={this.performSearch}
              value={this.state.keywords}
            />
            <span className="input-group-addon">
              <i className="fa fa-search" />
            </span>
          </div>
        </form>
        <div className="search-reset">
          <a href="#" onClick={this.resetSearch}>Reset search?</a>
        </div>
      </div>
    );
  }

});
