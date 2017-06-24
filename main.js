var bgImg = document.createElement("img");
bgImg.src = "images/map.png";


var enemyImg = document.createElement("img");
enemyImg.src = "images/rukia.gif";

var towerBtnImg = document.createElement("img");
towerBtnImg.src = "images/tower-btn.png";

var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";
var crosshairImg = document.createElement("Img");
crosshairImg.src = "images/crosshair.png";
 
var cannonballImg=document.createElement("img");
cannonballImg.src="images/cannon-ball.png";
var fps = 60; 

var enemyPath=[
{x:64,y:64},
{x:224,y:64},
{x:224,y:192},
{x:160,y:192},
{x:160,y:416},
{x:352,y:416},
{x:352,y:256},
{x:544,y:256},
{x:544,y:64},
]

function Enemy(){
	this.x=64;
	this.y=448;
	this.speed=64;
	this.pathDes=0;
	this.direction={
		x:0,
		y:-1
	};

	this.move=function(){
		if(isCollided(enemyPath[this.pathDes].x,enemyPath[this.pathDes].y,this.x,this.y,this.speed/fps,this.speed/fps)){
			this.x = enemyPath[this.pathDes].x;
			this.y = enemyPath[this.pathDes].y;
			this.pathDes++;
			if (this.pathDes !== enemyPath.length){
				var unitVector = getUnitVector(this.x,this.y,enemyPath[this.pathDes].x,enemyPath[this.pathDes].y);
			this.direction = unitVector;
			}
			else{
				this.Hp = 0;
			}

			


			
		}
		else{

			this.x = this.x + this.direction.x * this.speed/fps;
			this.y = this.y + this.direction.y * this.speed/fps;
		}
	}
}
var cannonballs=[];
var tower={
	x:0,
	y:0,
    range:96,
    aimingEnemyId:null,
    fireRate:1,
    readyToShootTime:1,
    searchEnemy: function(){
     	this.readyToShootTime-=1/fps;
     	console.log(this.readyToShootTime);
     for(var i=0; i<enemies.length; i++){
     		var distance = Math.sqrt( 
			Math.pow(this.x-enemies[i].x,2) + Math.pow(this.y-enemies[i].y,2));
		if (distance<=this.range) {
			this.aimingEnemyId = i;
		if(this.readyToShootTime<=0){
			this.shoot();
			this.readyToShootTime=this.fireRate;
			}
		return;
	}
	}
	this.aimingEnemyId = null;
	},

	shoot: function(){
		var newCannonball = new Cannonball(this);
		cannonballs.push(newCannonball);
		}
	};



function Cannonball(tower){
	this.speed=320;
	this.damage=5;
	var aimedEnemy=enemies[tower.aimingEnemyId];
	this.x=tower.x+6.5;
	this.y=tower.y;
	this.direction=getUnitVector(this.x,this.y,aimedEnemy.x,aimedEnemy.y);
    this.move=function(){
    	this.x+=this.direction.x*this.speed/fps;
    	this.y+=this.direction.y*this.speed/fps;
    }

}6.
var click = false;

var isbiding = false;

var enemies = []

var clock = 0;


function isCollided ( pointX, pointY, targetX, targetY, targetWidth, targetHeight ) {
	if(  	pointX >= targetX
	        &&  pointX <= targetX + targetWidth
	        &&  pointY >= targetY
	        &&  pointY <= targetY + targetHeight
	){
	        return true;
	} else {
	        return false;
	}
}




var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext('2d');

$('#game-canvas').mousemove(function(event){
    if (click == false){
	tower.x = event.offsetX;
	tower.y = event.offsetY;
	}
})
 

$('#game-canvas').click(function(){
	if((tower.x>640-64)&&(tower.y>480-64)){
		if(isbiding == false){
			isbiding = true;
		}else{
			isbiding = false;
		}
			
	}else{
		click=true;
	}
})

var Hp=100;
function draw(){
	clock = clock + 1;
    tower.searchEnemy()
	ctx.drawImage(bgImg,0,0);
	ctx.drawImage(towerBtnImg,640-64,480-64,64,64);
    ctx.fillText("Hp:"+Hp,1,20);
    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
	  for(var i=0;i<cannonballs.length;i++){
      	ctx.drawImage(cannonballImg,cannonballs[i].x,cannonballs[i].y,11,11);
		cannonballs[i].move();
	};
	
	for(var i=0;i<enemies.length;i++){
		
		if (enemies[i].Hp<=0){
			enemies.splice(i,1)
			Hp=Hp-10;
		}else{
			ctx.drawImage(enemyImg,enemies[i].x,enemies[i].y);
			enemies[i].move();
		}


	}

	if(clock%80==0){
		var newenemy = new Enemy();
		enemies.push(newenemy);
	}
  


	if(isbiding == true){
		ctx.drawImage(towerImg,tower.x-tower.x%32,tower.y-tower.y%32);
	}
	if(tower.aimingEnemyId!=null){
		var id = tower.aimingEnemyId;
		ctx.drawImage(crosshairImg, enemies[id].x, enemies[id].y)
	}	
}

  function getUnitVector (srcX, srcY, targetX, targetY) {
    var offsetX = targetX - srcX;
    var offsetY = targetY - srcY;
    var distance = Math.sqrt( Math.pow(offsetX,2) + Math.pow(offsetY,2) );
    var unitVector = {
        x: offsetX/distance,
        y: offsetY/distance
    };
    return unitVector;
}


setInterval(draw,1000/fps);


