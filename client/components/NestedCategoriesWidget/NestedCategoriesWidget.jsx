NestedCategoriesWidget = React.createClass({

  propTypes: {
    field: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    categories: React.PropTypes.object.isRequired
  },

  mixins: [ReactMeteorData],

  componentWillMount() {
    this.setState({ nestedCategories: this.props.categories });
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
      this.data.searchParams.fields[this.props.field] = selectedCategoryPath;
      Session.set('searchParams', this.data.searchParams);
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
          <ul className="category-tree">
            {
              this.state.nestedCategories.children.map((child) => {
                return (
                  <NestedCategories key={child.name} categories={child}
                    onCategorySelect={this.handleCategorySelect}
                    selectedCategoryPath={this.state.selectedCategoryPath}
                  />
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }

});
