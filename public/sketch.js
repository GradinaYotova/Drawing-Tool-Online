var socket;
var mySketches = [];

socket = io.connect('https://canvas-online.herokuapp.com/'); 
// socket = io.connect('http://192.168.88.23:3000');

var canvas;
var myDrawingSketch = function(p) {

	p.setup = function() {
		p.createCanvas(window.innerWidth,1000);
		p.background(225,0);
		// p.background(225);

		socket.on('mouse', p.newDrawing);
	}

	p.newDrawing = function(data){
		if(data.index === p.index) {
			p.noStroke();
			p.fill(255,0,1);
			p.rect(data.x, data.y, 10, 10);
		}
	}

	p.mouseMoved = function() {

		console.log(p.mouseX + ',' + p.mouseY);
		
		p.data = {
			index: p.index,
			x: p.mouseX,
			y: p.mouseY
		}

		socket.emit('mouse', p.data); 

		p.noStroke();
		p.fill(0);
		p.rect(p.mouseX, p.mouseY, 10, 10);
	}

	p.draw = function(){
		// p.background(255);
	}
}

for(var i = 0; i < 1; i++) {
	mySketches[i] = new p5(myDrawingSketch);
	mySketches[i].index = i;
}

$(function(){
    resizeCanvas();
});

$(window).on('resize', function(){
    resizeCanvas();
});

function resizeCanvas()
{
    var canvas = $('#defaultCanvas0');
    canvas.css("width", $(window).width());
    canvas.css("height", $(window).height());
}

