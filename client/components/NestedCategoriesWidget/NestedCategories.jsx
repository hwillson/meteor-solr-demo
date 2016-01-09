NestedCategories = React.createClass({

  propTypes: {
    categories: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return { children: [] };
  },

  onChildDisplayToggle(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.props.categories.children) {
      if (this.state.children && this.state.children.length) {
        this.setState({ children: null });
      } else {
        this.setState({ children: this.props.categories.children });
      }
    }
  },

  render() {
    if (!this.state.children) {
      this.state.children = [];
    }

    const classes = classNames({
      'has-children': (this.props.categories.children ? true : false),
      'no-children': (this.props.categories.children ? false : true),
      'open': (this.state.children.length ? true : false),
      'closed': (this.state.children ? false : true),
      'selected': (this.state.selected ? true : false)
    });

    return (
      <li ref="node" className={classes} onClick={this.onChildDisplayToggle}>
        <a href="#">{this.props.categories.name}</a>
        <ul>
          {
            this.state.children.map((child) => {
              return <NestedCategories key={child.name} categories={child} />;
            })
          }
        </ul>
      </li>
    );

  }

});
