SearchFacets = React.createClass({

  propTypes: {
    facets: React.PropTypes.object.isRequired
  },

  renderFacets() {
    const searchFacets = [];
    _.keys(this.props.facets).forEach((facet) => {
      searchFacets.push(
        <SearchFacet key={facet} name={facet}
          values={this.props.facets[facet]}
        />
      );
    });
    return searchFacets;
  },

  render() {
    return (
      <div className="search-facets">
        {this.renderFacets()}
      </div>
    );
  }

});
