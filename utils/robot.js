var Robot = function(rightWheel, leftWheel, eyes){
  
  this.eyes = eyes;

  this.left = function(cb){
    leftWheel.forward();
    rightWheel.reverse();
    if (cb)
      cb();
    return this;
  }

  this.right = function(cb){
    leftWheel.reverse();
    rightWheel.forward();
    if(cb)
      cb();
    return this;
  }

  this.forward = function(cb){
    leftWheel.forward();
    rightWheel.forward();
    if(cb)
      cb();
    return this;
  }

  this.reverse = function(cb){
    leftWheel.reverse();
    rightWheel.reverse();
    if(cb)
      cb();
    return this;
  }

  this.stop = function(cb){
    leftWheel.stop();
    rightWheel.stop();
    if(cb)
      cb();
    return this;
  }

  this.direction = function (actionName, duration, cb) {
    var self = this;
    var action = this[actionName];
    action(cb);
    if (duration){
      setTimeout(function() {
        self.stop();
      }, duration);
    }
  }
}

module.exports = Robot;