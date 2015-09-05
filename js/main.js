var stage;
var gameOver = false;

var dif = 5;
var nrPhantom = 0;
var phantom = [];
var phantomSpeed = 7;

var scor = 0;

var target;

function Phantom(path){
	createjs.Bitmap.call(this, path);

	// var phantomBounds = this.getBounds();
	this.width = 40;//phantomBounds.width;
	this.height = 40;//phantomBounds.height;
	this.x = parseInt(Math.random()*1000000) % (stage.canvas.width-this.width);
	this.y = parseInt(Math.random()*1000000) % (stage.canvas.height-this.height);
	this.dir = parseInt(Math.random()*100) % 4;
	//0 up, 1 right, 2 down, 3 left

	var min={}, max={};
	min.x=0; 
	min.y=0;
	max.x=stage.canvas.width-this.width; 
	max.y=stage.canvas.height-this.height;
	this.move = function(dir){
		if (this.dir == 0 && (this.y - phantomSpeed)<=min.y) this.dir=2;
		else if (this.dir == 2 && (this.y + phantomSpeed)>=max.y) this.dir=0;
		else if (this.dir == 1 && (this.x + phantomSpeed)>=max.x) this.dir=3;
		else if (this.dir == 3 && (this.x - phantomSpeed)<=min.x) this.dir=1;

		if (this.dir == 0) this.y-=phantomSpeed;
		else if (this.dir == 1) this.x+=phantomSpeed;
		else if (this.dir == 2) this.y+=phantomSpeed;
		else if (this.dir == 3) this.x-=phantomSpeed;
	};

	this.checkCollision = function() {
    if ( player.x >= this.x + this.width || player.x + player.width <= this.x || player.y >= this.y + this.height || player.y + player.height <= this.y ) return false;
    return true;
	}
}
Phantom.prototype = Object.create(createjs.Bitmap.prototype);
Phantom.prototype.constructor = Phantom;


function Target(path){
	createjs.Bitmap.call(this, path);

	// var phantomBounds = this.getBounds();
	this.width = 40;//phantomBounds.width;
	this.height = 40;//phantomBounds.height;
	this.x = parseInt(Math.random()*1000000) % (stage.canvas.width-this.width);
	this.y = parseInt(Math.random()*1000000) % (stage.canvas.height-this.height);
	
	this.reset = function(){
		this.x = parseInt(Math.random()*1000000) % (stage.canvas.width-this.width);
		this.y = parseInt(Math.random()*1000000) % (stage.canvas.height-this.height);
	}

	this.checkCollision = function() {
    if ( player.x >= this.x + this.width || player.x + player.width <= this.x || player.y >= this.y + this.height || player.y + player.height <= this.y ) return false;
    this.reset();
    ++scor;
    $('#score').text(""+scor);
    // console.log("+1 scor");
    return true;
	}
}
Target.prototype = Object.create(createjs.Bitmap.prototype);
Target.prototype.constructor = Target;



function StartPhantomTimer(){
	setInterval(AddPhantom, dif*1000);
}

function AddPhantom(){
	phantom[nrPhantom] = new Phantom("assets/phantom.png");
	stage.addChild(phantom[nrPhantom]);
	++nrPhantom;

	console.log(nrPhantom);
}

var wallpaper;
var player;
var keys = [false, false, false, false];

function Player(path){
	createjs.Bitmap.call(this, path);
	// var bounds = this.getBounds();
	this.width = 40;
	this.height = 40;
	this.isMoving = false;
	this.vel = 5;

	this.update = function(){
		if (!gameOver){
			var i, aux = 0;
			var auxvel = this.vel;

			for (i = 0; i < 4; ++i)
				if (keys[i])
					++aux;
			
			if (!aux){
				isMoving = false;
				return;
				//not moving
			}
			else if (aux <2)
				auxvel = Math.sqrt(2 * this.vel * this.vel);

			if (keys[0]) this.x -= auxvel;
			if (keys[1]) this.y -=auxvel;
			if (keys[2]) this.x += auxvel;
			if (keys[3]) this.y +=auxvel;

			if (this.x < 0)
				this.x = 0;
			if (this.y < 0)
				this.y = 0;
			if (this.x + this.width > 800)
				this.x = 800 - this.width;
			if (this.y + this.height > 600)
				this.y = 600 - this.height;
		}
		else{
			stage.removeChild(player);
		}
	};
	this.collidedWith = function(object){
		console.log("Collided");
	};
}
Player.prototype = Object.create(createjs.Bitmap.prototype); 
Player.prototype.constructor = Player;

$(document).keydown(function(e){
	if (e.which >= 37 && e.which <=40){
		keys[e.which - 37] = true;
	}
});
$(document).keyup(function(e){
	if (e.which >= 37 && e.which <=40){
		keys[e.which - 37] = false;
	}
});


function init(){
	stage = new createjs.Stage("canvas");
	player = new Player('assets/player.png');
	target = new Target('assets/target.png');
	stage.addChild(player);
	stage.addChild(target);
	// stage.addEventListener("added", function(){console.log(player.getBounds());});
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", update);

	StartPhantomTimer();
}

function update(){
	
	MovingPhantoms();
	player.update();
	DetectingCollision();
	target.checkCollision();

	
	stage.update();
}

function MovingPhantoms(){
	for (var i=0; i<nrPhantom; ++i){
		phantom[i].move();
	}
}

function DetectingCollision(){
	for (i=0; i<nrPhantom; ++i)
		if (phantom[i].checkCollision())
		{
			gameOver=true;
			return;
		}
}

















