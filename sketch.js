var player;
var gameState = "start";
var house;

function preload(){
  playerImage = loadImage("Images/player.png");
  houseImage = loadImage("Images/house.png");
  enemyImg = loadImage("Images/enemy.png");

}

function setup(){
var canvas = createCanvas(800,800);
//var bg = createSprite(0,0,800);
//bg.addImage("ground",bgImg);

enemyGroup = createGroup();

player = createSprite(400,700,20,20);
player.addImage("running",playerImage)
player.scale = 0.5

house = createSprite(725,75,20,20);
house.addImage("goal",houseImage);
house.scale = 0.25
}

function draw(){
  background("gray");

  if(gameState === "start"){

  if(keyWentDown("UP_ARROW")){
    player.velocityY = - 1;
  }

  if(keyWentUp("UP_ARROW")){
    player.velocityY = 0
  }

  if(keyWentDown("RIGHT_ARROW")){
    player.velocityX =  1;
  }

  if(keyWentUp("RIGHT_ARROW")){
    player.velocityX = 0
  }

  if(keyWentDown("LEFT_ARROW")){
    player.velocityX = - 1;
  }

  if(keyWentUp("LEFT_ARROW")){
    player.velocityX = 0
  }

  if(enemyGroup.isTouching(player)){
    gameState = "end";
  }

  spawnEnemies();
  spawnObstacles();

}

if(gameState === "end"){
  textSize(20);
  fill("red");
  text("Press 'r' to restart",325,450);

  player.velocityX = 0;
  player.velocityY = 0;

    enemyGroup.setVelocityXEach(0);
    enemyGroup.setVelocityYEach(0);
    
}

if(keyDown("r")){
  player.x = 400;
  player.y = 700;
  enemyGroup.destroyEach();
  gameState = "start";
}
 
if(player.isTouching(house)){
  gameState = "over";
  textSize(20);
  fill("green");
  text("You win",375,450);
}

  drawSprites();
  
}

function spawnEnemies() {
  if (frameCount % 60 === 0) {
    var enemy = createSprite(0,120,40,25);
    enemy.addImage("enemey",enemyImg);
    enemy.scale = 0.35
    enemy.velocityY = 1;
    enemy.x  = Math.round(random(10,700));
    enemy.shapeColor = "red"

    //assign lifetime to the variable
    enemy.lifetime = 675;
    
    //add each cloud to the group
    enemyGroup.add(enemy);
  }
  
}

function spawnObstacles() {
    var lazer = createSprite(0,500,600,30);
    lazer.shapeColor = "red"
    var lazer2 = createSprite(800,350,600,30);
    lazer2.shapeColor = "red"
    var lazer3 = createSprite(0,200,600,30);
    lazer3.shapeColor = "red"

    if(player.isTouching(lazer)||player.isTouching(lazer2)||player.isTouching(lazer3)){
      gameState = "end";
    }
  }
  

