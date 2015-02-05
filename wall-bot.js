"use strict";

var five = require("johnny-five"),
    temporal = require('temporal'),
    keypress = require('keypress'),

  Wheel = require("./utils/hbridge-wheel"),
  Robot = require("./utils/robot"),
  Eyes = require("./utils/eyes"),
  avoidWalls = require("./strategies/avoid-walls"),  
  avoidCorners = require("./strategies/avoid-corners"),  

  board = new five.Board({
    //port : "/dev/tty.KhayaBot-DevB"
  });

// The board's pins will not be accessible until
// the board has reported that it is read

board.on("ready", function() {

  var wheel1 = new Wheel(9, 8),
      wheel2 = new Wheel(6, 7);

  var robot = new Robot(wheel1, wheel2, new Eyes(13));

  this.repl.inject({
    robot : robot
  });

  keypress(process.stdin);

  // listen for the "keypress" event
  process.stdin.on('keypress', function (ch, key) {
    console.log('got "keypress"', key);
    if (!key)
      return;

    if (key && !key.ctrl)
    {
      switch(key.name){
        case "up":
          robot.direction("forward");
          break;
        case "down":
          robot.direction("reverse");
          break;  
        case "left":
        case "right":
          robot.direction(key.name);
            break;
        case "space" :
          robot.stop();
      }
    }
     
    if (key && key.ctrl)
    {
      switch(key.name){
        case "up":
          robot.direction("forward", 250);
          break;
        case "down":
          robot.direction("reverse", 250);
          break;  
        case "left":
        case "right":
          robot.direction(key.name, 250);
            break;
        case "space" :
          robot.stop();
      }
    }

    if (key && key.ctrl && key.name == 's') {
      
      robot.forward();
      robot.eyes.closeToWall(10, function(){
        avoidCorners(robot);
      });
    }
    
    if (key && key.ctrl && key.name == 'w') {

      robot.forward();

      robot.eyes.closeToWall(10, function(distance){
        avoidWalls(robot);
      });

    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();

});


// Schematic
// http://arduino.cc/en/uploads/Tutorial/ExampleCircuit_bb.png
