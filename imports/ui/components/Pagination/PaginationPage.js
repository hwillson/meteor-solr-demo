import React from 'react';

const PaginationPage = ({ page }) => (
  <a href="#page">{page}</a>
);

PaginationPage.propTypes = {
  page: React.PropTypes.number.isRequired,
};

export default PaginationPage;
