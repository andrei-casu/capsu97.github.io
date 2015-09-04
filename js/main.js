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

	createjs.Ticker.addEventListener("tick", update);
}

function move(dir){
	if (dir == 'up'){
		wallpaper.y -= 4;
	}
	esle if (dir == 'down'){
		
	}
}

function update(){
	// wallpaper.x += 5;
	stage.update();
}