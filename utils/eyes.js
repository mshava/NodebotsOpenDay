var five = require("johnny-five");

var Eyes = function (sonarPin) {

  var self = this;
  var sonar = new five.Ping({
    pin : sonarPin,
    pulse : '200'
  });

  self.distanceToWall = 0;

  self.closeToWall = function(tolerance, cb){
    sonar.on('change', function(){
      self.distanceToWall = this.cm;
      if (this.cm <= tolerance){
        cb(tolerance);
      }
    });
  };

}

module.exports = Eyes;