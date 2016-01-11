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
      this.data.searchParams.fields[this.props.field] = selectedCategoryPath;
      this.setState({
        // nestedCategories: { children: [] },
        selectedCategoryPath
      });
      Session.set('searchParams', this.data.searchParams);
    }
  },

  render() {
    return (
      <div className="nested-categories panel panel-default">
        <div className="panel-heading"><strong>{this.props.name}</strong></div>
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
