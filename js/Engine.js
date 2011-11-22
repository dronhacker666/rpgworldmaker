
var _Engine = function(){

		this.width = 640;
		this.height = 480;
		this.ctx = null;
		this.working = false;
		
		this.view = {posx:0, posy:0, width:640, height:480};
		
		this.focus_layer = 0;
		
		this.cursor_x = 0;
		this.cursor_y = 0;
		
		this.layers = [];

};

_Engine.prototype = {

	init: function(){
		var render = this;
		var canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;
		canvas.style.width = this.width;
		canvas.style.height = this.height;
		this.ctx = canvas.getContext('2d');
		var ctx = this.ctx;
		
		$("#screen_panel").append(canvas);

		canvas.onmousemove = function(event){
		
			var x=0,y=0,obj = canvas;
			while(obj) {
				x+=obj.offsetLeft;
				y+=obj.offsetTop;
				obj=obj.offsetParent;
			}
			render.cursor_x = parseInt((event.pageX - x + render.view.posx)/32);
			render.cursor_y = parseInt((event.pageY - y + render.view.posy)/32);
			
		}
		
		canvas.onmousedown = function(event){
		
			render.layers[render.focus_layer][render.cursor_y][render.cursor_x].tileid = Tiles.selectedTiles[0].id;
		
		}
		
		canvas.onmouseup = function(event){
			
			
			
		}
		
		console.log("Engine init");
	},
	
	start: function(){
		this.working = true;
		this._draw();
	},
	
	stop: function(){
		this.working = false;
	},
		
	_draw: function(){
		var render = this;
		if(!this.working)return;
		
		this.ctx.fillStyle = 'rgb(0,0,0)';  
		this.ctx.fillRect(0,0,this.width,this.height);
		this.Draw();
		
		setTimeout(function(){render._draw.call(render)}, 10);
	},
	
	addTexture: function(name){
		var img = new Image();
		img.src = name;
		var num = this.textures.length;
		this.textures[num] = img;
		return num;
	},
	
	addTile: function(name, type){
		Tiles.add(name, type);
	},
	
	addLayer: function(width, height){
		
		var num = this.layers.length;
		
		this.layers[num] = [];
		
		this.layers[num].width = width;
		this.layers[num].height = height;
		
		for(var y=0; y<height; y++){
			this.layers[num][y] = [];
			for(var x=0; x<width; x++){
				this.layers[num][y][x] = {tileid: 0, action: 0};
			}
		}
		
		return num;
	},
	
	Draw: function(){
	
		for(var l in this.layers){
	
			if(this.focus_layer == l) this.ctx.globalAlpha = 1;
			else this.ctx.globalAlpha = 0.5;
	
			for(var y=0; y<this.layers[l].height; y++){
				for(var x=0; x<this.layers[l].width; x++){

					var tile = Tiles.collection[this.layers[l][y][x].tileid];

					this.ctx.drawImage( tile.texture , tile.tex_offsetX,tile.tex_offsetY,32,32, x*32 - this.view.posx, y*32 - this.view.posy,32,32 );

				}
			}
			
		}
	
		
		this.ctx.strokeStyle = "#FFF";
		this.ctx.rect(x*32 - this.view.posx, y*32 - this.view.posy,32,32);
		this.ctx.stroke();
		
	
		this.ctx.fillStyle = 'rgba(0,0,0,0.4)';  
		this.ctx.fillRect(this.cursor_x*32 - this.view.posx, this.cursor_y*32 - this.view.posy, 32, 32);
	
	},

	setScreenSize: function(width, height){
		this.width = width;
		this.height = height;
		$(this.ctx.canvas).css({
			width: width,
			height: height,
		})
		.attr({
			width: width,
			height: height,			
		});
	}
}

var Engine = new _Engine();

