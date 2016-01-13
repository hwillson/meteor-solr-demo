SearchFacetUtils = {

  getCustomValue(field, value) {
    let customValue = value;
    const customLabels = SearchConfig.customFacetLabels[field];
    if (customLabels && customLabels[value]) {
      customValue = customLabels[value];
    }
    return customValue;
  }

};
