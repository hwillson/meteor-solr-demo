const NestedCategory = (() => {
  const myPublic = {};
  const myPrivate = {};

  /* Public */

  myPublic.init = () => {
    myPrivate.nestedCategory = {
      name: 'Categories',
      path: '',
      count: 0,
      children: [],
    };
  };

  myPublic.build = (flatCategories) => {
    flatCategories.forEach((categories) => {
      const categoryNames = categories.names;
      const categoryCount = categories.count;

      let current = myPrivate.nestedCategory;
      let path = `${categoryNames[0]}/`;
      for (let j = 1; j < categoryNames.length; j++) {
        let category = myPrivate.find(current, categoryNames[j]);
        if (category === null && j === 0) {
          category = myPrivate.findRecursive(current, categoryNames[j]);
        }
        path += `${categoryNames[j]}/`;
        if (category === null) {
          category = {
            name: categoryNames[j],
            path,
            count: categoryCount,
          };
          if (current.children === undefined) {
            current.children = [];
          }
          current.children.push(category);
        }
        current = category;
      }
    });
    return myPrivate.nestedCategory;
  };

  /* Private */

  myPrivate.find = (parent, name) => {
    for (let i = 0; parent.children && i < parent.children.length; i++) {
      if (parent.children[i].name === name) {
        return parent.children[i];
      }
    }
    return null;
  };

  myPrivate.findRecursive = (parent, name) => {
    let category;
    for (let i = 0; parent.children && i < parent.children.length; i++) {
      category = this.find(parent.children[i], name);
      if (category !== null) {
        return category;
      }
    }
    for (let i = 0; parent.children && i < parent.children.length; i++) {
      category = this.findRecursive(parent.children[i], name);
      if (category !== null) {
        return category;
      }
    }
    return null;
  };

  return myPublic;
})();

export default NestedCategory;
