SearchContainer = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    const searchResults = PowerSearch.getData({
      transform(matchText, regExp) {
        return matchText.replace(regExp, '<strong>$&</strong>');
      }
    });
    const searchMetadata = PowerSearch.getMetadata();
    return {
      searchResults,
      searchMetadata
    };
  },

  render() {
    let mainContent;
    if (this.data.searchResults.length) {
      mainContent = (
        <main>
          <ResultsCount searchMetadata={this.data.searchMetadata} />
          <SearchResults searchResults={this.data.searchResults} />
          <Pagination searchMetadata={this.data.searchMetadata} />
        </main>
      );
    } else {
      mainContent = (
        <main>
          <WelcomeContent />
        </main>
      );
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
