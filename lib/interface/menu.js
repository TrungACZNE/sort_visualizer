var React = require("react");
var cn    = require("classnames");

var Menu = React.createClass({
  propTypes: {
    label     : React.PropTypes.string.isRequired,
    alignment : React.PropTypes.oneOf(["horizontal", "vertical"]),
    zIndex    : React.PropTypes.number,

    onFlush   : React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      alignment : "vertical",
      zIndex    : 0,
      onFlush   : function() {}
    }
  },
  getInitialState: function() {
    return {
      selected : false
    };
  },
  onMenuToggle: function(e) {
    e.stopPropagation();
    this.setState({selected: !this.state.selected});
  },
  onFlush: function() {
    this.setState({selected: false});
    this.props.onFlush();
  },
  render: function() {
    var self = this;
    return (
      <div className="interface-menu" onClick={self.onMenuToggle}>
        <div className="interface-menu__label">
          {self.props.label + " ▶"}
        </div>
        <div
          className={
            cn(
              "interface-menu__dropdown",
              "interface-menu__dropdown--" + self.props.alignment,
              {"block--hidden": !self.state.selected}
            )
          }
          style={{zIndex: self.props.zIndex}}>
          {React.Children.map(self.props.children,
            function(child) {
              var props = null
              if (child.type.propTypes.onFlush) {
                props = {
                  onFlush : self.onFlush
                };
              }

              if (child.type.propTypes.alignment) {
                props.alignment = (self.props.aligment == "horizontal" ? "vertical" : "horizontal")
                props.zIndex    = self.props.zIndex + 1
              }

              if (props) {
                return React.cloneElement(child, props);
              }
              return child;
            }
          )}
        </div>
      </div>
    );
  }
});

module.exports = Menu;
