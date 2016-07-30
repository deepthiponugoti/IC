var Box = function(){
}

Box.prototype.WIDTH = canvas.width;
Box.prototype.HEIGHT = canvas.height;

Box.prototype.drawCanvasBorderLines = function(){
	drawLine(0, 0, 0, canvas.height);
	drawLine(0, canvas.height, canvas.width, canvas.height);
	drawLine(canvas.width, canvas.height, canvas.width, 0);
}

var drawLine = function(moveToX, moveToY, lineToX, lineToY) {
	context.beginPath();
	context.moveTo(moveToX, moveToY);
	context.lineTo(lineToX, lineToY);
	context.strokeStyle = 'DarkOliveGreen';
	context.lineWidth = 5;
	context.stroke();
};