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
        fields: {},
        currentPage: 1
      };
      Session.set('searchParams', searchParams);
    }

    if (searchParams.keywords) {
      PowerSearch.search(
        searchParams.keywords,
        {
          currentPage: searchParams.currentPage,
          fields: searchParams.fields,
          resultsPerPage: this.state.resultsPerPage
        }
      );
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
      currentPage: searchParams.currentPage,
      selectedFields: searchParams.fields
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
                resultsPerPage={this.state.resultsPerPage}
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
      sidebarContent = (<WelcomSidebar />);
    } else {
      if (this.data.searchMetadata.facets) {
        sidebarContent = (
          <aside>
            <h2>Refine Your Search</h2>
            <NestedCategoriesWidget field="source" name="Categories"
              categories={this.data.searchMetadata.nestedCategories.source}
              selectedCategoryPath={this.data.selectedFields.source}
              showHelp
            />
            <SearchFacet key="doctype" name="Document Type"
              field="doctype"
              values={this.data.searchMetadata.facets.doctype}
            />
            <NestedCategoriesWidget field="date_ss" name="Date"
              categories={this.data.searchMetadata.nestedCategories.date_ss}
            />
            <SearchFacet key="author" name="Author" field="author"
              values={this.data.searchMetadata.facets.author}
            />
          </aside>
        );
      }
    }
    return sidebarContent;
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
