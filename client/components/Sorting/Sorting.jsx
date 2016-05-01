Sorting = React.createClass({

  propTypes: {
    searchParams: React.PropTypes.object.isRequired,
    handleSearchParamsUpdate: React.PropTypes.func.isRequired,
  },

  updateSearchParams(event) {
    const newSearchParams = _.extend({}, this.props.searchParams);
    newSearchParams.sorting = event.target.value;
    this.props.handleSearchParamsUpdate(newSearchParams);
  },

  renderSortOptions() {
    const sortOptions = [
      {
        label: 'Most relevant first',
        value: App.models.searchSort.lookup.relevancy.id,
      },
      {
        label: 'Newest first',
        value: App.models.searchSort.lookup.lastModifiedDesc.id,
      },
      {
        label: 'Oldest first',
        value: App.models.searchSort.lookup.lastModifiedAsc.id,
      },
    ];
    let renderedOptions = [];
    sortOptions.forEach((option) => {
      renderedOptions.push(
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      );
    });
    return renderedOptions;
  },

  render() {
    return (
      <div className="sorting">
        <select className="form-control" onChange={this.updateSearchParams}
            value={this.props.searchParams.sorting}>
          {this.renderSortOptions()}
        </select>
      </div>
    );
  }

});
