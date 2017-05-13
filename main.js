var bgImg = document.createElement("img");
bgImg.src = "images/map.png";


var enemyImg = document.createElement("img");
enemyImg.src = "images/rukia.gif";

var towerBtnImg = document.createElement("img");
towerBtnImg.src = "images/tower-btn.png";

var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";


var fps = 60; 

var enemy ={
	x:96,
	y:448,
	speed:64,
	direction:{
		x:0,
		y:-1
	},
	move:function(){
		this.x = this.x + this.direction.x * this.speed/fps;
		this.y = this.y + this.direction.y * this.speed/fps;
	}
}
var tower={
	x:0,
	y:0
}

var isbiding = false;




var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext('2d');

$('#game-canvas').mousemove(function(event){

	tower.x = event.offsetX;
	tower.y = event.offsetY;
})
 

$('#game-canvas').click(function(){
	if((tower.x>640-64)&&(tower.y>480-64)){
		if(isbiding == false){
			isbiding = true;
		}else{
			isbiding = false;
		}
	}
})


function draw(){
	ctx.drawImage(bgImg,0,0);
	ctx.drawImage(enemyImg,enemy.x,enemy.y);
	ctx.drawImage(towerBtnImg,640-64,480-64,64,64);
	if(isbiding == true){
		ctx.drawImage(towerImg,tower.x-tower.x%32,tower.y-tower.y%32);
	}
	enemy.move();
}


setInterval(draw,1000/fps);

