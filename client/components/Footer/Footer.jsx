Footer = React.createClass({

  render() {
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
  }

});
