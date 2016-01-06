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

  render() {
    return (
      <div className="search-bar clearfix">
        <form className="navbar-form navbar-left pull-right"
          role="search"
        >
          <div className="input-group">
            <input ref="keywords" className="form-control"
              placeholder="Search keywords" autoFocus
              onChange={this.performSearch}
            />
            <span className="input-group-addon">
              <i className="fa fa-search" />
            </span>
          </div>
        </form>
      </div>
    );
  }

});
