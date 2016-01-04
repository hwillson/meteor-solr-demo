SearchResult = React.createClass({

  propTypes: {
    name: React.PropTypes.string
  },

  render() {
    return (
      <li className="search-result" dangerouslySetInnerHTML=
        {{ __html: this.props.name }}
      />
    );
  }

});
