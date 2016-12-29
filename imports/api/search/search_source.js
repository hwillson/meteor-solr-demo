import { SearchSource } from 'meteor/meteorhacks:search-source';

const options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true,
};

const PowerSearch = new SearchSource('powerSearch', ['name'], options);

export default PowerSearch;
