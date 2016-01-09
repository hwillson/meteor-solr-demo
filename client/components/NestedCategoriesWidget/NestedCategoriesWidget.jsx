NestedCategoriesWidget = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    categories: React.PropTypes.array.isRequired
  },

  componentWillMount() {
    this.prepareNestedCategories();
  },

  prepareNestedCategories() {
    const splitCategories = [];
    this.props.categories.forEach((value) => {
      splitCategories.push(value.name.split('/'));
    });
    this.setState({ nestedCategories: NestedCategory.build(splitCategories) });
  },

  render() {
    return (
      <div className="nested-categories panel panel-default">
        <div className="panel-heading"><strong>{this.props.name}</strong></div>
        <div className="panel-body">
          <ul className="category-tree">
            {
              this.state.nestedCategories.children.map((child) => {
                return <NestedCategories key={child.name} categories={child} />;
              })
            }
          </ul>
        </div>
      </div>
    );
  }

});
