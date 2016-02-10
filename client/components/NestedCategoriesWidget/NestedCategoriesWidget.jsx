NestedCategoriesWidget = React.createClass({

  propTypes: {
    field: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    categories: React.PropTypes.object.isRequired,
    searchParams: React.PropTypes.object.isRequired,
    handleSearchParamsUpdate: React.PropTypes.func.isRequired,
    showHelp: React.PropTypes.bool,
    selectedCategoryPath: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      showHelp: false
    };
  },

  componentWillMount() {
    this.setState({
      showHelp: this.props.showHelp
    });
  },

  handleCategorySelect(selectedCategoryPath) {
    if (selectedCategoryPath) {
      const newSearchParams = _.extend({}, this.props.searchParams);
      newSearchParams.fields[this.props.field] = selectedCategoryPath;
      newSearchParams.currentPage = 1;
      this.props.handleSearchParamsUpdate(newSearchParams);
      window.scroll(0, 0);
    }
  },

  resetSelectedCategory() {
    const newSearchParams = _.extend({}, this.props.searchParams);
    delete newSearchParams.fields[this.props.field];
    this.props.handleSearchParamsUpdate(newSearchParams);
  },

  closeHelp() {
    this.setState({
      showHelp: false
    });
  },

  renderResetLink() {
    if (this.props.selectedCategoryPath) {
      return (
        <div className="reset">
          <button className="btn btn-xs btn-danger"
            onClick={this.resetSelectedCategory}
          >
            <i className="fa fa-times-circle"></i> RESET
          </button>
        </div>
      );
    }
  },

  renderHelp() {
    if (this.state.showHelp) {
      return (
        <div className="alert alert-info alert-dismissible notice" role="alert">
          <button type="button" className="close" onClick={this.closeHelp}>
            <span aria-hidden="true">&times;</span>
          </button>
          Click <i className="fa fa-plus-square"></i> to see more
          categories; click on a category name to refine your search.
        </div>
      );
    }
  },

  renderCategoryContent() {
    let categoryContent;
    if (this.props.categories.children.length > 0) {
      const categories = [];
      this.props.categories.children.map((child) => {
        categories.push(
          <NestedCategories key={child.name} categories={child}
            onCategorySelect={this.handleCategorySelect}
            selectedCategoryPath={this.props.selectedCategoryPath}
          />
        );
      });
      categoryContent = (
        <ul className="category-tree">
          {categories}
        </ul>
      );
    } else {
      categoryContent = (<span>No results found.</span>);
    }
    return categoryContent;
  },

  render() {
    return (
      <div className="nested-categories panel panel-default">
        <div className="panel-heading clearfix">
          <div className="pull-left">
            <strong>{this.props.name}</strong>
          </div>
          <div className="pull-right">
            {this.renderResetLink()}
          </div>
        </div>
        <div className="panel-body">
          {this.renderHelp()}
          {this.renderCategoryContent()}
        </div>
      </div>
    );
  }

});
