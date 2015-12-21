MainLayout = React.createClass({

  propTypes: {
    content: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <main>{this.props.content}</main>
      </div>
    );
  }

});
