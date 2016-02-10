SearchBar = React.createClass({

  propTypes: {
    searchParams: React.PropTypes.object.isRequired,
    handleSearchParamsUpdate: React.PropTypes.func.isRequired,
    searchSuggestions: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      searchSuggestions: []
    };
  },

  getInitialState() {
    return {
      keywords: ''
    };
  },

  componentWillMount() {
    this.setSearchKeywords = _.debounce((keywords) => {
      const newSearchParams = _.extend({}, this.props.searchParams);
      newSearchParams.keywords = keywords;
      newSearchParams.provideSuggestions = true;
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

  renderSearchSuggestions() {
    let suggestionList;
    if (this.props.searchSuggestions) {
      const suggestions = [];
      this.props.searchSuggestions.forEach((suggestion) => {
        suggestions.push(
          <li key={suggestion} className="list-group-item">{suggestion}</li>
        );
      });
      suggestionList = (
        <ul className="search-suggestions list-group">
          {suggestions}
        </ul>
      );
    }
    return suggestionList;
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
          {this.renderSearchSuggestions()}
        </form>
        <div className="search-reset">
          <a href="#" onClick={this.resetSearch}>Reset search?</a>
        </div>
      </div>
    );
  }

});
