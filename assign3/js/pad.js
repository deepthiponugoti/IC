var Pad = function(){
}

Pad.prototype.drawPad = function(x,y,w,h, color) {
    context.beginPath();
    context.rect(x,y,w,h);
    context.fillStyle = color;
    context.closePath();
    context.fill();
}

Pad.prototype.paddleProperties = {
	width: canvas.width / 10,
	height: 10 ,
	start :canvas.width / 2 - (canvas.width /20),
	end : 0
};