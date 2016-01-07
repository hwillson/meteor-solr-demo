SearchContainer = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      resultsPerPage: 10
    };
  },

  getMeteorData() {
    let searchParams = Session.get('searchParams');
    if (!searchParams) {
      searchParams = {
        keywords: '',
        fields: {}
      };
      Session.set('searchParams', searchParams);
    }

    let currentPage = Session.get('currentPage');
    if (!currentPage) {
      currentPage = 1;
    }
    if (searchParams.keywords && currentPage) {
      PowerSearch.search(
        searchParams.keywords,
        {
          currentPage,
          fields: searchParams.fields
        }
      );
      // PowerSearch.search(
      //   SearchQuery.buildQueryString(searchParams),
      //   { currentPage }
      // );
    }

    const searchResults = PowerSearch.getData({
      transform(matchText, regExp) {
        return matchText.replace(regExp, '<strong>$&</strong>');
      }
    });
    const searchMetadata = PowerSearch.getMetadata();
    return {
      keywords: searchParams.keywords,
      searchResults,
      searchMetadata,
      currentPage
    };
  },

  renderMain() {
    let mainContent;
    if (!this.data.keywords) {
      mainContent = (
        <main>
          <WelcomeContent />
        </main>
      );
    } else {
      if (PowerSearch.getStatus().loaded) {
        if (this.data.searchResults.length) {
          mainContent = (
            <main>
              <ResultsCount searchMetadata={this.data.searchMetadata}
                resultsPerPage={this.state.resultsPerPage}
                currentPage={this.data.currentPage}
              />
              <SearchResults searchResults={this.data.searchResults}
                resultsPerPage={this.state.resultsPerPage}
                currentPage={this.data.currentPage}
              />
              <Pagination searchMetadata={this.data.searchMetadata}
                currentPage={this.data.currentPage}
              />
            </main>
          );
        } else {
          mainContent = (<main>No results found.</main>);
        }
      } else if (PowerSearch.getStatus().loading) {
        mainContent = (
          <main>
            Loading ...
          </main>
        );
      } else {
        mainContent = (
          <main>
            Oh no! Looks like we're having problems completing your search!
          </main>
        );
      }
    }
    return mainContent;
  },

  renderSidebar() {
    let sidebarContent;
    if (!this.data.keywords) {
      sidebarContent = (
        <aside>
          TODO ...
        </aside>
      );
    } else {
      sidebarContent = (
        <aside>
          <h2>Refine Your Search</h2>
          {this.renderFacets()}
        </aside>
      );
    }
    return sidebarContent;
  },

  renderFacets() {
    if (this.data.searchMetadata.facets) {
      return <SearchFacets facets={this.data.searchMetadata.facets} />;
    }
  },

  render() {
    return (
      <div className="search-container">
        <header>
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <div className="row">
                <div className="col-md-2">
                  <SearchLogo />
                </div>
                <div className="col-md-10">
                  <SearchBar />
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div className="search-body">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                {this.renderMain()}
              </div>
              <div className="col-md-4">
                {this.renderSidebar()}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

});
