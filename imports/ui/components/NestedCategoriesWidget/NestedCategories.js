/* eslint-disable react/prefer-es6-class */

import React from 'react';
import classNames from 'classnames';

const NestedCategories = React.createClass({
  propTypes: {
    categories: React.PropTypes.object.isRequired,
    onCategorySelect: React.PropTypes.func.isRequired,
    selectedCategoryPath: React.PropTypes.string,
  },

  getInitialState() {
    return {
      showChildren: false,
    };
  },

  componentWillMount() {
    if (this.isCategorySelected(this.props.selectedCategoryPath)) {
      this.showChildren();
    }
  },

  componentWillReceiveProps(newProps) {
    if (newProps.selectedCategoryPath
        && this.isCategorySelected(newProps.selectedCategoryPath)) {
      this.showChildren();
    } else {
      this.hideChildren();
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

  showChildren() {
    this.setState({ showChildren: true });
  },

  hideChildren() {
    this.setState({ showChildren: false });
  },

  toggleChildren() {
    if (this.state.showChildren) {
      this.hideChildren();
    } else {
      this.showChildren();
    }
  },

  isCategorySelected(incomingCategory) {
    let isCategorySelected = false;
    const currentPath = this.props.categories.path.substring(
      1,
      this.props.categories.path.length
    );
    if (incomingCategory && (incomingCategory.indexOf(currentPath) > -1)) {
      isCategorySelected = true;
    }
    return isCategorySelected;
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
        <a href="#category" onClick={this.handleCategorySelect}>
          {this.props.categories.name}
        </a>
      );
    }
    return categoryLink;
  },

  renderChildrenCategories() {
    let childrenCategoryContent;
    const childrenCategories = [];
    if (this.props.categories.children) {
      this.props.categories.children.forEach((child) => {
        childrenCategories.push(
          <NestedCategories
            key={child.name}
            categories={child}
            onCategorySelect={this.props.onCategorySelect}
            selectedCategoryPath={this.props.selectedCategoryPath}
          />
        );
      });
      if (childrenCategories) {
        childrenCategoryContent = (
          <ul>{childrenCategories}</ul>
        );
      }
    }
    return childrenCategoryContent;
  },

  render() {
    const classes = classNames({
      'has-children': this.props.categories.children,
      'no-children': !this.props.categories.children,
      open: this.state.showChildren,
      closed: !this.state.showChildren,
    });

    return (
      <li
        className={classes}
        onClick={this.onChildDisplayToggle}
      >
        {this.renderCategoryLink()}
        <span className="count">({this.props.categories.count})</span>
        {this.renderChildrenCategories()}
      </li>
    );
  },
});

export default NestedCategories;
