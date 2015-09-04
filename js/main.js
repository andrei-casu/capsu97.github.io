var stage;

var dif = 1;
var nrPhantom = 0;
var phantom = [];
var phantomSpeed = 7;

function Phantom(path){
	createjs.Bitmap.call(this, path);

	var phantomBounds = this.getBounds();
	this.width = phantomBounds.width;
	this.height = phantomBounds.height;
	this.x = parseInt(Math.random()*1000000) % (stage.canvas.height-this.height);
	this.y = parseInt(Math.random()*1000000) % (stage.canvas.width-this.width);
	this.dir = parseInt(Math.random()*100) % 4;
	//0 up, 1 right, 2 down, 3 left

	var min={}, max={};
	min.x=0; 
	min.y=0;
	max.x=stage.canvas.width-this.width; 
	max.y=stage.canvas.height-this.height;
	this.move = function(dir){
		if (this.dir == 0 && (this.y - phantomSpeed)==min.y) this.dir=2;
		else if (this.dir == 2 && (this.y + phantomSpeed)==max.y) this.dir=0;
		else if (this.dir == 1 && (this.x + phantomSpeed)==max.x) this.dir=3;
		else if (this.dir == 3 && (this.x - phantomSpeed)==min.x) this.dir=1;

		if (this.dir == 0) this.y-=phantomSpeed;
		else if (this.dir == 1) this.x+=phantomSpeed;
		else if (this.dir == 2) this.y+=phantomSpeed;
		else if (this.dir == 3) this.x-=phantomSpeed;
	};
}
Phantom.prototype = Object.create(createjs.Bitmap.prototype);
Phantom.prototype.constructor = Phantom;

function StartPhantomTimer(){
	setInterval(AddPhantom, dif*1000);
}

function AddPhantom(){
	phantom[nrPhantom] = new Phantom("assets/phantom.png");
	stage.addChild(phantom[nrPhantom]);
	++nrPhantom;

	console.log(nrPhantom);
}

function init(){
	stage = new createjs.Stage("canvas");
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", update);

	StartPhantomTimer();
}

function update(){
	for (var i=0; i<nrPhantom; ++i){
		phantom[i].move();
	}
}










