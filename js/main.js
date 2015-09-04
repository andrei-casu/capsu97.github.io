var stage;
var wallpaper;
var player;

$(document).keydown(function(e) {
	if (e.which == 37){
		wallpaper.isMoving = true;
		wallpaper.direction = "left";
	}
	else if (e.which == 38){
		wallpaper.isMoving = true;
		wallpaper.direction = "up";
	}
	else if (e.which == 39){
		wallpaper.isMoving = true;
		wallpaper.direction = "right";
	}
	else if (e.which == 40){
		wallpaper.isMoving = true;
		wallpaper.direction = "down";
	}
	else{
		wallpaper.isMoving = false;
	}
});

$(document).keyup(function(e) {
	if (e.which >=37 && e.which <=40)
		wallpaper.isMoving = false;
});

function moveItem(){
		if (!this.isMoving)
			return;
		if (this.direction == 'left'){
			this.x -= this.velx;
		}
		else if (this.direction == 'up'){
			this.y -= this.vely;
		}
		else if (this.direction == 'right'){
			this.x += this.velx;
		}
		else if (this.direction == 'down'){
			this.y += this.vely;
		}
	};

function init(){
	stage = new createjs.Stage("canvas");
	wallpaper = new createjs.Bitmap("assets/player.png");
	wallpaper.x = 0;
	wallpaper.y = 0;
	wallpaper.isMoving = false;
	wallpaper.direction = "none";
	wallpaper.velx = 7;
	wallpaper.vely = 7;
	stage.addChild(wallpaper);

	wallpaper.move = moveItem;

	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", update);
}

function move(dir){
	if (dir == 'up'){
		wallpaper.y -= wallpaper.vely;
	}
	else if (dir == 'down'){
		wallpaper.y += wallpaper.vely;
	}
	else if (dir == 'left'){
		wallpaper.x -= wallpaper.velx;
	}
	else if (dir == 'right'){
		wallpaper.x += wallpaper.velx;
	}
}

function update(){
	//wallpaper.x += 5;
	wallpaper.move();
	stage.update();
}