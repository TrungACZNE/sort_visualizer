var React    = require("react");
var ReactDOM = require("react-dom");
var Menu     = require("./interface/menu.js");
var MenuItem = require("./interface/menuitem.js");
var Files    = require("./files.js");
var Runtime  = require("./runtime.js");

var Application = React.createClass({
  getInitialState: function() {
    return {code: ""}
  },
  onChange: function(e) {
    this.setState({code: e.target.value});
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

      var result = sortFunc([5,4,3,2,1]);
      console.log(runtime.eventLog);
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
      <table className="application-container">
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
              <table>
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
