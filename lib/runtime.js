var Runtime = function() {
  var self = this;
  self.eventLog = [];
  self.swap = function(array, x, y) {
    self.eventLog.push([self.swap, arguments]);
    var tmp = array[x];
    array[x] = y;
    array[y] = tmp;
  }
}

module.exports = Runtime;
