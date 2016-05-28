var Runtime = function() {
  var self = this;
  self.eventLog = [];
  self.swap = function(array, x, y) {
    self.eventLog.push({
      method:"swap",
      args: [x, y]
    });
    var tmp = array[x];
    array[x] = array[y];
    array[y] = tmp;
  }
  self.execute = function(array, action) {
    action.args.unshift(array);
    self[action.method].apply(self, action.args);
  }
}

module.exports = Runtime;
