var React   = require("react");
var Runtime = require("./runtime.js");
var cn      = require("classnames");

var Visualization = React.createClass({
  getInitialState: function() {
    return {session: null}
  },
  componentWillReceiveProps: function(nextProps) {
    if (!nextProps.session) return;
    this.setState({
      runtime  : new Runtime(),
      array    : nextProps.session.data,
      step     : 0,
      eventLog : nextProps.session.eventLog
    });

    setTimeout(this.timeStep, 200);
  },
  timeStep: function() {
    var state = this.state;
    var step = state.step ;
    if (step < state.eventLog.length) {
      var action = state.eventLog[step];
      var array = state.array;
      state.runtime.execute(array, action);
      this.setState({array: array});
      this.setState({step: step + 1});
      setTimeout(this.timeStep, 1000);
    }
  },
  render: function() {
    var self = this;
    if (!self.state.array) return (<div> </div>);
    else {
      return (
        <div className="visual">
          {this.state.array.map(
            function(element, i) {
              return (
                <div className="visual__cell">
                  <p className="visual__cell__text">
                    {element}
                  </p>
                </div>
              )
            }
          )}
        </div>
      );
    }
  }
});

module.exports = Visualization;
