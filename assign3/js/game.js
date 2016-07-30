var context;
var box = new Box();
var intervalId = 50;
var timer = new Timer();
var paddle = new Pad();
var balls = [new Ball(100, 100, 'red', canvas.width / 100, canvas.width / 100),
new Ball(200, 200, 'blue', canvas.width / 100, -canvas.width / 100),
new Ball(200, 300, 'green', -canvas.width / 100, -canvas.width / 100)]

var startGame = function(canvas) {
    context = canvas.getContext("2d");
    paddle.drawPad(paddle.paddleProperties.start, paddle.paddleProperties.end, 
 		paddle.paddleProperties.width, paddle.paddleProperties.height, 'black');

};

var createHandler = function(){

	var mouseMoveHandler = function(event){
        var relativeX = event.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < box.WIDTH - paddle.paddleProperties.width) {
            paddle.paddleProperties.start = relativeX;
        }
	}
	var touchHandler = function(touchEvent){
        var touches = touchEvent.changedTouches;
            var relativeX = touches[touches.length - 1].clientX - canvas.offsetLeft;
            if (relativeX > 0 && relativeX < box.WIDTH - paddle.paddleProperties.width) {
                paddle.paddleProperties.start = relativeX;
            }
	}
	return {
	    mouseMoveHandler: mouseMoveHandler,
		touchHandler : touchHandler
	  };
}
var startGameOnClick = function(event){
    canvas.removeEventListener('click', startGameOnClick);
    balls.forEach(drawBall);
    timer.updateTimer();

   intervalId = setInterval(draw, intervalId);
}

var drawBall= function(ball){
	    ball.drawBall(ball.x, ball.y, ball.radius, ball.color);
};

var collide = function() {
  for (var i = 0; i < balls.length; i += 1) {
    var ballOne = balls[i];
    for (var j = i + 1; j < balls.length; j += 1) {
      var ballTwo = balls[j];
      if (ballOne.ballCollisionTest(ballTwo)) {
        ballOne.xDisplacement = -ballOne.xDisplacement;
		ballOne.yDisplacement = -ballOne.yDisplacement;
		ballTwo.xDisplacement = -ballTwo.xDisplacement;
		ballTwo.yDisplacement = -ballTwo.yDisplacement;
      }
    }
  }
}

var draw = function() {
    context.clearRect(0, 0, box.WIDTH, box.HEIGHT);
	
	var recordLastPositions = function(ball){
		ball.lastX = ball.x;
		ball.lastY = ball.y;
	}
	balls.forEach(recordLastPositions);
	
    paddle.drawPad(paddle.paddleProperties.start, paddle.paddleProperties.end, 
		paddle.paddleProperties.width, paddle.paddleProperties.height, 'black');
		

	var drawBall= function(ball){
		    ball.drawBall(ball.x, ball.y, ball.radius, ball.color);
	};
	var hittingWalls = function(ball){
			ball.hittingTheWalls(ball, box.WIDTH)
	};
	var setDisplacement = function(ball){
			ball.x = ball.x + ball.xDisplacement ;
			ball.y = ball.y + ball.yDisplacement ;
	};
		
	box.drawCanvasBorderLines();
	
	balls.forEach(drawBall);
	collide();
	balls.forEach(hittingWalls);
	balls.forEach(setDisplacement)
	
	endGame();
}

var endGame = function(){
	var gameend = document.getElementById('gameover');
    if(balls.length === 0){
        context.clearRect(0, 0, box.WIDTH, box.HEIGHT);
	    paddle.drawPad(paddle.paddleProperties.start, paddle.paddleProperties.end, 
			paddle.paddleProperties.width, paddle.paddleProperties.height, 'black');
		box.drawCanvasBorderLines();
        clearTimeout(intervalId);
        gameend.innerHTML = "GAME OVER!"
        timer.clearTimer();
    }
}
