var stage;
var wallpaper;

function init(){

	Mousetrap.bind('up', function(){move('up');});
	Mousetrap.bind('down', function(){move('down');});
	Mousetrap.bind('right', function(){move('right');});
	Mousetrap.bind('left', function(){move('left');});

	stage = new createjs.Stage("canvas");
	wallpaper = new createjs.Bitmap("assets/wallpaper.png");
	stage.addChild(wallpaper);
	wallpaper.x = 0;
	wallpaper.y = 0;
	wallpaper.velx = 10;
	wallpaper.vely = 10;

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
	// wallpaper.x += 5;
	stage.update();
}