SearchBar = React.createClass({

  propTypes: {
    searchParams: React.PropTypes.object.isRequired,
    handleSearchParamsUpdate: React.PropTypes.func.isRequired,
    searchSuggestions: React.PropTypes.array,
    requestSuggestions: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      searchSuggestions: []
    };
  },

  getInitialState() {
    return {
      keywords: '',
      selectedSuggestionIndex: 0,
      showSuggestions: true
    };
  },

  componentWillMount() {
    this.setSearchKeywords = _.debounce((keywords) => {
      this.props.requestSuggestions(keywords);
      const newSearchParams = _.extend({}, this.props.searchParams);
      newSearchParams.keywords = keywords;
      this.props.handleSearchParamsUpdate(newSearchParams);
    }, 500);
  },

  performSearch(event) {
    if (!this.state.showSuggestions) {
      this.setState({ showSuggestions: true });
    }
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

  selectSuggestion(event) {

    if (event.keyCode === 40
        && (this.state.selectedSuggestionIndex
          < this.props.searchSuggestions.length - 1)) {
      // Moving down
      this.setState({
        selectedSuggestionIndex: ++this.state.selectedSuggestionIndex
      });
    } else if (event.keyCode === 38 && this.state.selectedSuggestionIndex > 0) {
      // Moving up
      this.setState({
        selectedSuggestionIndex: --this.state.selectedSuggestionIndex
      });
    } else if (event.keyCode === 13) {
      // Selected suggestion
      const newSearchParams = _.extend({}, this.props.searchParams);
      newSearchParams.keywords =
        this.props.searchSuggestions[this.state.selectedSuggestionIndex];
      this.props.handleSearchParamsUpdate(newSearchParams);
      this.props.requestSuggestions(null);
      this.setState({
        keywords: `"${newSearchParams.keywords}"`,
        selectedSuggestionIndex: 0
      });
    } else if (event.keyCode === 27) {
      // Cancel autosuggest (esc key)
      this.setState({ showSuggestions: false });
    }

  },

  hideSuggestions(event) {
    event.preventDefault();
    this.setState({ showSuggestions: false });
  },

  renderSearchSuggestions() {
    let suggestionList;
    if (this.state.showSuggestions && this.props.searchSuggestions
        && (this.props.searchSuggestions.length > 0)) {
      const suggestions = [];
      let suggestionIndex = 0;
      this.props.searchSuggestions.forEach((suggestion) => {
        const active = classNames({
          'active': (suggestionIndex === this.state.selectedSuggestionIndex
            ? true : false)
        });
        suggestions.push(
          <li key={suggestion} className={'list-group-item ' + active}>
            {suggestion}
          </li>
        );
        suggestionIndex++;
      });
      suggestionList = (
        <div>
          <a href="#" className="close-suggestions"
            onClick={this.hideSuggestions}
          >
            <i className="fa fa-times-circle fa-2x"></i>
          </a>
          <ul className="search-suggestions list-group hidden-xs">
            {suggestions}
          </ul>
        </div>
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
              onKeyDown={this.selectSuggestion}
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
