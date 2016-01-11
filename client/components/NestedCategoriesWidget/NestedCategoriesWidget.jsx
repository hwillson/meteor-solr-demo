NestedCategoriesWidget = React.createClass({

  propTypes: {
    field: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    categories: React.PropTypes.object.isRequired,
    showHelp: React.PropTypes.bool
  },

  mixins: [ReactMeteorData],

  getDefaultProps() {
    return {
      showHelp: false
    };
  },

  componentWillMount() {
    this.setState({
      nestedCategories: this.props.categories,
      showHelp: this.props.showHelp
    });
  },

  componentWillReceiveProps(newProps) {
    if (newProps.categories) {
      this.setState({ nestedCategories: newProps.categories });
    }
  },

  getMeteorData() {
    return {
      searchParams: Session.get('searchParams')
    };
  },

  handleCategorySelect(selectedCategoryPath) {
    if (selectedCategoryPath) {
      this.setState({
        // nestedCategories: { children: [] },
        selectedCategoryPath
      });
      const searchParams = Session.get('searchParams');
      searchParams.fields[this.props.field] = selectedCategoryPath;
      searchParams.currentPage = 1;
      Session.set('searchParams', searchParams);
    }
  },

  resetSelectedCategory() {
    // event.preventDefault();
    this.setState({
      nestedCategories: { children: [] },
      selectedCategoryPath: ''
    });
    delete this.data.searchParams.fields[this.props.field];
    Session.set('searchParams', this.data.searchParams);
  },

  closeHelp() {
    this.setState({
      showHelp: false
    });
  },

  renderResetLink() {
    if (this.state.selectedCategoryPath) {
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
    if (this.state.nestedCategories.children.length > 0) {
      const categories = [];
      this.state.nestedCategories.children.map((child) => {
        categories.push(
          <NestedCategories key={child.name} categories={child}
            onCategorySelect={this.handleCategorySelect}
            selectedCategoryPath={this.state.selectedCategoryPath}
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
