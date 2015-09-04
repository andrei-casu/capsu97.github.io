var stage;
var wallpaper;

function init(){
	stage = new createjs.Stage("canvas");
	wallpaper = new createjs.Bitmap("assets/wallpaper.png");
	stage.addChild(wallpaper);
	wallpaper.x = 0;

	createjs.Ticker.addEventListener("tick", update);
}

function update(){
	wallpaper.x += 5;
	stage.update();
}