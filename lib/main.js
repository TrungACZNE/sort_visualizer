var React    = require("react");
var ReactDOM = require("react-dom");
var Menu     = require("./interface/menu.js");
var MenuItem = require("./interface/menuitem.js");

var Application = React.createClass({
  render: function() {
    var self = this;
    return (
      <table>
        <tbody>
          <tr>
            <td className="interface-menu__dropdown">
              <Menu label="File">
                <Menu label="New">
                  <MenuItem label="GUI Application"/>
                  <MenuItem label="Console application"/>
                </Menu>
                <MenuItem label="Exit"/>
              </Menu>
            </td>
            <td>
              <table>
                <colgroup>
                  <col style={{minWidth: "400px"}}/>
                  <col/>
                </colgroup>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
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
