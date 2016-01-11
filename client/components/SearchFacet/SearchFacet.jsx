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
    this.data.searchParams.fields[this.props.field] = selectedFacet;
    Session.set('searchParams', this.data.searchParams);
  },

  unrefineFacet() {
    event.preventDefault();
    this.setState({ selectedFacet: null });
    delete this.data.searchParams.fields[this.props.field];
    Session.set('searchParams', this.data.searchParams);
  },

  renderFacetLink(name) {
    let facetLink;
    if (this.state.selectedFacet) {
      facetLink = (
        <span>
          [<a href="#" onClick={this.unrefineFacet}>reset</a>]
          Showing: <strong>{name}</strong>
        </span>
      );
    } else {
      facetLink = (
        <a href="#" onClick={this.refineByFacet}>{name}</a>
      );
    }
    return facetLink;
  },

  renderFacetValues() {
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
    return facetValues;
  },

  render() {
    return (
      <div className="search-facet panel panel-default">
        <div className="panel-heading">
          <strong>{this.props.name}</strong>
        </div>
        <div className="panel-body">
          <ul>
            {this.renderFacetValues()}
          </ul>
        </div>
      </div>
    );
  }

});
