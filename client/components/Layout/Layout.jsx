Layout = React.createClass({

  propTypes: {
    content: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div>
        {this.props.content}
      </div>
    );
  }

});
