PaginationPage = React.createClass({

  propTypes: {
    page: React.PropTypes.number.isRequired
  },

  render() {
    return (
      <a href="#">{this.props.page}</a>
    );
  }

});
