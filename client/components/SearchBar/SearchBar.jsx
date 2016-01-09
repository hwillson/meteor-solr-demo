SearchBar = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      searchParams: Session.get('searchParams')
    };
  },

  performSearch(event) {
    const search = _.throttle(() => {
      const searchParams = Session.get('searchParams');
      searchParams.keywords = event.target.value;
      Session.set('searchParams', searchParams);
    }, 200);
    search();
  },

  resetSearch(event) {
    event.preventDefault();
    Session.set('searchParams', {
      keywords: '',
      fields: {}
    });
    this.refs.keywords.focus();
  },

  render() {
    return (
      <div className="search-bar clearfix">
        <form className="navbar-form navbar-left pull-right"
          role="search"
        >
          <div className="input-group">
            <input ref="keywords" className="form-control"
              placeholder="Search keywords" autoFocus
              value={this.data.searchParams.keywords}
              onChange={this.performSearch}
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
