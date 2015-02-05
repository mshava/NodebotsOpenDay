var temporal = require('temporal');

var Orientate = function(robot){
  	    
	this.lookRight = function(){
	robot.direction("right", 500);
	this.rightDistance = robot.eyes.distanceToWall;
	console.log("direction to the right : " + this.rightDistance);
	}

	this.lookLeft = function(){
	robot.direction("left", 750);
	this.leftDistance = robot.eyes.distanceToWall;

	console.log("direction to the left : " + this.leftDistance);
	}

	this.directionToGo = function(){

		if (this.rightDistance > this.leftDistance){
		  console.log("go right")
		  robot.direction("right", 750, function(){
		    robot.forward();
		  });   
		}
		else {
		  console.log("go right")
		  robot.forward()
		}

	}
};

module.exports = function (robot) {
	
	robot.forward();
  	robot.eyes.closeToWall(10, function(distance){

		console.log("close to a wall... : " + distance);
		robot.stop();

	    var reverse = function(){
	      robot.direction("reverse", 250);  
	    };

	    var orientate = new Orientate(robot);
	    
	    temporal.queue([
	      {
	        delay : 250,
	        task : reverse
	      },
	      {
	        delay : 500,
	        task : orientate.lookRight
	      },
	      
	      {
	        delay : 1000,
	        task : orientate.lookLeft
	      },
	      {
	        delay : 1000,
	        task : orientate.directionToGo
	      }
	      ]);
	});
};