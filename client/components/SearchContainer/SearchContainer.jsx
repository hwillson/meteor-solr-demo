SearchContainer = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      resultsPerPage: 10
    };
  },

  getMeteorData() {
    const keywords = Session.get('keywords');
    let currentPage = Session.get('currentPage');
    if (!currentPage) {
      currentPage = 1;
    }
    if (keywords && currentPage) {
      PowerSearch.search(keywords, { currentPage });
    }

    const searchResults = PowerSearch.getData({
      transform(matchText, regExp) {
        return matchText.replace(regExp, '<strong>$&</strong>');
      }
    });
    const searchMetadata = PowerSearch.getMetadata();
    return {
      keywords,
      searchResults,
      searchMetadata,
      currentPage
    };
  },

  render() {
    let mainContent;
    if (!this.data.keywords) {
      mainContent = (
        <main>
          <WelcomeContent />
        </main>
      );
    } else {
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
        mainContent = (
          <main>
            Loading ...
          </main>
        );
      }
    }

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
                {mainContent}
              </div>
              <div className="col-md-4">
                <aside>
                  todo
                </aside>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

});
