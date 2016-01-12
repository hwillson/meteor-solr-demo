NestedCategory = (() => {

  let _public;
  let _private;

  _public = {

    init() {
      _private.nestedCategory = {
        name: 'Categories',
        path: '',
        count: 0,
        children: []
      };
    },

    build(flatCategories) {
      flatCategories.forEach((categories) => {

        const categoryNames = categories.names;
        const categoryCount = categories.count;

        let current = _private.nestedCategory;
        let path = categoryNames[0] + '/';
        for (let j = 1; j < categoryNames.length; j++) {
          let category = _private.find(current, categoryNames[j]);
          if (category === null && j === 0) {
            category = _private.findRecursive(current, categoryNames[j]);
          }
          path += categoryNames[j] + '/';
          if (category === null) {
            category = {
              name: categoryNames[j],
              path,
              count: categoryCount
            };
            if (current.children === undefined) {
              current.children = [];
            }
            current.children.push(category);
          }
          current = category;
        }
      });
      return _private.nestedCategory;
    }

  };

  _private = {

    find(parent, name) {
      for (let i = 0; parent.children && i < parent.children.length; i++) {
        if (parent.children[i].name === name) {
          return parent.children[i];
        }
      }
      return null;
    },

    findRecursive(parent, name) {
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
    }

  };

  return _public;

})();
