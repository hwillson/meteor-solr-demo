SearchBar = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      keywords: Session.get('keywords')
    };
  },

  performSearch(event) {
    const search = _.throttle(() => {
      Session.set('keywords', event.target.value);
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
              placeholder="Search ARF content" autoFocus
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
