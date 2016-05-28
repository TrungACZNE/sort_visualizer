var React         = require("react");
var ReactDOM      = require("react-dom");

var Menu          = require("./interface/menu.js");
var MenuItem      = require("./interface/menuitem.js");
var Files         = require("./files.js");
var Runtime       = require("./runtime.js");
var Visualization = require("./visualization.js");

var Application = React.createClass({
  getInitialState: function() {
    return {code: ""}
  },
  onChange: function(e) {
    this.setState({code: e.target.value});
  },
  startVisualization: function(eventLog, data) {
    var session = (this.state.session || {});
    var id = (session.id || 0) + 1;
    this.setState({session: {id: id, eventLog: eventLog, data: data}});
  },
  onRun: function() {
    try {
      var runtime = new Runtime();
      var swap = runtime.swap;
      var sortFunc = eval(
        "(function() {\n" +
        this.state.code +
        "\nreturn sort;\n})()"
      );
      var data = [5,4,3,2,1];
      var result = sortFunc(JSON.parse(JSON.stringify(data)));
      this.startVisualization(runtime.eventLog, data);
    } catch(e) {
      alert(e + "");
    }
  },
  loadFile: function(filename) {
    var self = this;
    return function() {
      self.setState({code: Files[filename]});
    }
  },
  render: function() {
    var self = this;
    return (
      <table className="container">
        <tbody>
          <tr>
            <td className="interface-menu__dropdown">
              <Menu label="File">
                <Menu label="Open sample">
                  <MenuItem
                    label="Quick sort"
                    onClick={this.loadFile("quicksort")}/>
                  <MenuItem
                    label="Merge sort"
                    onClick={this.loadFile("mergesort")}/>
                </Menu>
              </Menu>
              <MenuItem label="Run" onClick={this.onRun}/>
            </td>
          </tr>
          <tr>
            <td>
              <table className="container">
                <colgroup>
                  <col style={{width: "600px"}}/>
                  <col/>
                </colgroup>
                <tbody>
                  <tr>
                    <td>
                      <textarea
                        className="code-container__textarea"
                        ref="textarea" value={this.state.code}
                        rows="40"
                        onChange={this.onChange}>
                      </textarea>
                    </td>
                    <td>
                      <Visualization session={this.state.session}/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
});

ReactDOM.render(<Application/>, document.getElementById("root"));
