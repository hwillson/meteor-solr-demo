import React from 'react';

const Layout = ({ content }) => (
  <div>
    {content}
  </div>
);

Layout.propTypes = {
  content: React.PropTypes.object.isRequired,
};

export default Layout;
