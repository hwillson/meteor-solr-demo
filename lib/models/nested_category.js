NestedCategory = (() => {

  let _public;
  let _private;

  _public = {

    init() {
      _private.nestedCategory = {
        name: 'Categories',
        path: '',
        children: []
      };
    },

    build(flatCategories) {
      flatCategories.forEach((categories) => {
        let current = _private.nestedCategory;
        let path = categories[0] + '/';
        for (let j = 1; j < categories.length; j++) {
          let category = _private.find(current, categories[j]);
          if (category === null && j === 0) {
            category = _private.findRecursive(current, categories[j]);
          }
          path += categories[j] + '/';
          if (category === null) {
            category = {
              name: categories[j],
              path
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
