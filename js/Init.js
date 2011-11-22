$(function(){

	Engine.init();
	
	$(document).bind("contextmenu", function(){return false;});
	
	var screen = $("#screen_panel");
	
	Engine.setScreenSize(screen.width(), screen.height());
	
	Engine.addTile("tile.png", 0);
	Engine.addTile("tile2.png", 0);
	Engine.addTile("tile3.png", 0);
	Engine.addTile("tile4.png", 0);
	Engine.addTile("tile5.png", 1);

	Engine.addLayer(10,10);
	Engine.start();


});