var React = require("react");

var MenuItem = React.createClass({
  propTypes: {
    label   : React.PropTypes.string.isRequired,

    onClick : React.PropTypes.func,
    onFlush : React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      onClick : function(e) { },
      onFlush : function(e) { }
    }
  },
  onClick: function(e) {
    e.stopPropagation();
    this.props.onClick();
    this.props.onFlush();
  },
  render: function() {
    return (
      <div className="interface-menu__label" onClick={this.onClick}>
        {this.props.label}
      </div>
    );
  }
});

module.exports = MenuItem;
