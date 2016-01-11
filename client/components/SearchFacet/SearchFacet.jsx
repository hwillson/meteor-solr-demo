SearchFacet = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    field: React.PropTypes.string.isRequired,
    values: React.PropTypes.array.isRequired
  },

  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      selectedFacet: ''
    };
  },

  getMeteorData() {
    return {
      searchParams: Session.get('searchParams')
    };
  },

  refineByFacet(event) {
    event.preventDefault();
    const selectedFacet = event.target.innerHTML;
    this.setState({ selectedFacet });
    const searchParams = Session.get('searchParams');
    searchParams.fields[this.props.field] = selectedFacet;
    searchParams.currentPage = 1;
    Session.set('searchParams', searchParams);
  },

  unrefineFacet() {
    event.preventDefault();
    this.setState({ selectedFacet: null });
    const searchParams = Session.get('searchParams');
    delete searchParams.fields[this.props.field];
    Session.set('searchParams', searchParams);
  },

  renderFacetLink(name) {
    let facetLink;
    if (this.state.selectedFacet) {
      facetLink = (
        <span className="selected">{name}</span>
      );
    } else {
      facetLink = (
        <a href="#" onClick={this.refineByFacet}>{name}</a>
      );
    }
    return facetLink;
  },

  renderFacetContent() {
    let facetContent;
    if (this.props.values && (this.props.values.length > 0)) {
      const facetValues = [];
      this.props.values.forEach((value) => {
        if (!this.state.selectedFacet
            || (this.state.selectedFacet === value.name)) {
          facetValues.push(
            <li key={value.name}>
              {this.renderFacetLink(value.name)}
              &nbsp;({value.count})
            </li>
          );
        }
      });
      facetContent = (<ul>{facetValues}</ul>);
    } else {
      facetContent = (<span>No results found.</span>);
    }
    return facetContent;
  },

  renderResetLink() {
    if (this.state.selectedFacet) {
      return (
        <div className="reset">
          <button className="btn btn-xs btn-danger"
            onClick={this.unrefineFacet}
          >
            <i className="fa fa-times-circle"></i> RESET
          </button>
        </div>
      );
    }
  },

  render() {
    return (
      <div className="search-facet panel panel-default">
        <div className="panel-heading clearfix">
          <div className="pull-left">
            <strong>{this.props.name}</strong>
          </div>
          <div className="pull-right">
            {this.renderResetLink()}
          </div>
        </div>
        <div className="panel-body">
          {this.renderFacetContent()}
        </div>
      </div>
    );
  }

});
