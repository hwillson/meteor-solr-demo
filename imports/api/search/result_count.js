const ResultCount = {
  calculateStartCount(currentPage, resultsPerPage) {
    let resultsStartCount = 1;
    if (currentPage > 1) {
      resultsStartCount += (currentPage - 1) * resultsPerPage;
    }
    return resultsStartCount;
  },
};

export default ResultCount;
