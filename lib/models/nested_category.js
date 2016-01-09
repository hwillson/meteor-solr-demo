NestedCategory = (() => {

  const _private = {

    nestedCategory: {
      name: 'All Content',
      children: []
    },

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

  const _public = {

    build(flatCategories) {
      flatCategories.forEach((categories) => {
        let current = _private.nestedCategory;
        for (let j = 0; j < categories.length; j++) {
          let category = _private.find(current, categories[j]);
          if (category === null && j === 0) {
            category = _private.findRecursive(current, categories[j]);
          }
          if (category === null) {
            category = {
              name: categories[j]
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

  return _public;

})();
