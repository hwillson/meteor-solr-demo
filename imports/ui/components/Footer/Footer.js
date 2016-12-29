import React from 'react';
import moment from 'moment';

const Footer = () => {
  const year = moment().format('YYYY');
  return (
    <footer className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          Some Company &copy; {year}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
