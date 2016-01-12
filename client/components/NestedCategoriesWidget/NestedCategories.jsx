NestedCategories = React.createClass({

  propTypes: {
    categories: React.PropTypes.object.isRequired,
    onCategorySelect: React.PropTypes.func.isRequired,
    selectedCategoryPath: React.PropTypes.string
  },

  getInitialState() {
    return {
      children: []
    };
  },

  componentWillMount() {
    if (this.doesCategoryMatch(this.props.selectedCategoryPath)) {
      this.toggleChildren();
    }
  },

  componentWillReceiveProps(newProps) {
    if (newProps.selectedCategoryPath
        && this.doesCategoryMatch(newProps.selectedCategoryPath)) {
      this.toggleChildren();
    }
  },

  onChildDisplayToggle(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.props.categories.children) {
      this.toggleChildren();
    } else {
      this.props.onCategorySelect(this.props.categories.path);
    }
  },

  toggleChildren() {
    if (this.props.categories.children) {
      if (this.state.children && this.state.children.length) {
        this.setState({ children: null });
      } else {
        this.setState({ children: this.props.categories.children });
      }
    }
  },

  doesCategoryMatch(incomingCategory) {
    let doesCategoryMatch = false;
    if (incomingCategory
        && (incomingCategory.indexOf(this.props.categories.path) === 0)) {
      doesCategoryMatch = true;
    }
    return doesCategoryMatch;
  },

  handleCategorySelect(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onCategorySelect(this.props.categories.path);
  },

  renderCategoryLink() {
    let categoryLink;
    if (this.props.selectedCategoryPath === this.props.categories.path) {
      categoryLink = (
        <span className="selected">{this.props.categories.name}</span>
      );
    } else {
      categoryLink = (
        <a href="#" onClick={this.handleCategorySelect}>
          {this.props.categories.name}
        </a>
      );
    }
    return categoryLink;
  },

  render() {
    if (!this.state.children) {
      this.state.children = [];
    }

    const classes = classNames({
      'has-children': (this.props.categories.children ? true : false),
      'no-children': (this.props.categories.children ? false : true),
      'open': (this.state.children.length ? true : false),
      'closed': (this.state.children ? false : true)
    });

    return (
      <li ref="node" className={classes} onClick={this.onChildDisplayToggle}>
        {this.renderCategoryLink()}
        <span className="count">({this.props.categories.count})</span>
        <ul>
          {
            this.state.children.map((child) => {
              return (
                <NestedCategories key={child.name} categories={child}
                  onCategorySelect={this.props.onCategorySelect}
                  selectedCategoryPath={this.props.selectedCategoryPath}
                />
              );
            })
          }
        </ul>
      </li>
    );

  }

});
