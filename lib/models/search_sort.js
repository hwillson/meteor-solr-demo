const searchSort = {
  lookup: {
    relevancy: {
      id: 'relevancy',
      field: 'score',
      order: 'desc',
      orderNum: -1,
    },
    lastModifiedDesc: {
      id: 'lastModifiedDesc',
      field: 'lastmodified',
      order: 'desc',
      orderNum: -1,
    },
    lastModifiedAsc: {
      id: 'lastModifiedAsc',
      field: 'lastmodified',
      order: 'asc',
      orderNum: 1,
    },
  },

  getSolrSort(id) {
    return `${this.lookup[id].field}+${this.lookup[id].order}`;
  },

  getMongoSort(id) {
    return {
      [this.lookup[id].field]: this.lookup[id].orderNum,
    }
  }
};

App.models.searchSort = searchSort;
