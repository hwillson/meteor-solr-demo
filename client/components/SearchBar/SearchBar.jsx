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
      selectedSuggestionIndex: -1,
      showSuggestions: true
    };
  },

  componentWillMount() {
    this.setSearchKeywords = _.debounce(() => {
      this.requestSuggestions(this.state.keywords);
      const newSearchParams = _.extend({}, this.props.searchParams);
      newSearchParams.keywords = this.state.keywords;
      this.updateSearchParams(newSearchParams);
    }, 500);
  },

  performSearch(event) {
    if (!this.state.showSuggestions) {
      this.setState({ showSuggestions: true });
    }
    const keywords = event.target.value;
    if (keywords) {
      if (keywords.indexOf(this.state.keywords) === -1) {
        this.resetSearch();
      }
      this.setState({ keywords });
      this.setSearchKeywords();
    } else {
      this.resetSearch();
    }
  },

  requestSuggestions(keywords) {
    if (keywords) {
      let sliceStart = keywords.lastIndexOf('"');
      if (sliceStart < 0) {
        sliceStart = 0;
      }
      let suggestionKeywords = keywords.slice(sliceStart);
      suggestionKeywords = suggestionKeywords.replace(/"/g, '');
      this.props.requestSuggestions(suggestionKeywords);
    } else {
      this.setState({
        showSuggestions: false
      });
    }
  },

  resetSearch(event) {
    if (event) {
      event.preventDefault();
    }
    this.hideSuggestions();
    this.updateSearchParams(null);
    this.refs.keywords.focus();
    this.setState({
      keywords: '',
      selectedSuggestionIndex: -1
    });
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
    } else if ((event.keyCode === 13) || (event.type === 'click')) {
      if (this.state.selectedSuggestionIndex > -1) {
        // Selected suggestion (via enter key or mouse click)
        const newSearchParams = _.extend({}, this.props.searchParams);
        let suggestionKeywords =
          this.props.searchSuggestions[this.state.selectedSuggestionIndex];
        suggestionKeywords = suggestionKeywords.replace(/<(?:.|\n)*?>/gm, '');
        suggestionKeywords = `"${suggestionKeywords}" `;

        let lastQuotePosition = newSearchParams.keywords.lastIndexOf('"');
        if (lastQuotePosition <= 0) {
          newSearchParams.keywords = suggestionKeywords;
        } else if (((newSearchParams.keywords.match(/"/g)
            || []).length % 2) === 0) {
          newSearchParams.keywords =
            newSearchParams.keywords.substring(0, lastQuotePosition + 1)
            + ' ' + suggestionKeywords;
        } else {
          newSearchParams.keywords =
            newSearchParams.keywords.substring(0, lastQuotePosition)
            + suggestionKeywords;
        }

        this.updateSearchParams(newSearchParams);
        this.props.requestSuggestions(null);
        let keywords;
        if (newSearchParams.keywords) {
          keywords = newSearchParams.keywords;
        }
        this.setState({
          keywords
        });
      }
      this.hideSuggestions();
    } else if (event.keyCode === 27) {
      // Cancel autosuggest (esc key)
      this.hideSuggestions();
    }

  },

  highlightSuggestionByMouse(event) {
    let suggestionIndex = event.target.getAttribute('data-suggestion-index');
    this.setState({ selectedSuggestionIndex: parseInt(suggestionIndex, 10) });
  },

  hideSuggestions(event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({
      showSuggestions: false,
      selectedSuggestionIndex: -1
    });
  },

  updateSearchParams(newSearchParams) {
    this.props.handleSearchParamsUpdate(newSearchParams);
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
          <li key={suggestionIndex} className={'list-group-item ' + active}
            data-suggestion-index={suggestionIndex}
            onMouseEnter={this.highlightSuggestionByMouse}
            onClick={this.selectSuggestion}
          >
            <span data-suggestion-index={suggestionIndex}
              dangerouslySetInnerHTML={{ __html: suggestion }} />
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
          <ul className="search-suggestions list-group">
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
