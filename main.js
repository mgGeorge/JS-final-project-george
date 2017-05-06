var bgImg = document.createElement("img");
bgImg.src = "images/map.png";


var jasonImg = document.createElement("img");
jasonImg.src = "images/jason.gif";

var towerBtnImg = document.createElement("img");
towerBtnImg.src = "images/tower-btn.png";

var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";

var jason ={
	x:96,
	y:448
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
	ctx.drawImage(jasonImg,jason.x,jason.y);
	ctx.drawImage(towerBtnImg,640-64,480-64,64,64);
	if(isbiding == true){
		ctx.drawImage(towerImg,tower.x,tower.y);
	}
}

setInterval(draw,16);