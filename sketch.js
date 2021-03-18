
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,bananasGroup;
var FoodGroup, obstacleGroup
var score
var survivalTime=0;
var cloudImage,cloudsGroup;
var endMonkey;
var monkeySound;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var invisibleGround

function preload(){
  
monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  endMonkey=loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 cloudImage=loadImage("unnamed.png");
  monkeySound=loadSound("Chimpanzee-SoundBible.com-901310467.mp3");
}
  

function setup() {
 
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.shapeColor="brown";
  ground.x=ground.width/2;
  console.log(ground.x);
  
    cloudsGroup = createGroup();
  bananasGroup=createGroup();
  obstaclesGroup=createGroup();
  score=0;
  invisibleGround=createSprite(400,350,900,10);
  invisibleGround.shapeColor="brown";
  invisibleGround.visible=false;
 
}
 

 
function draw() {

  createCanvas(400,400);
   background("lightgreen");
    
   drawSprites();
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   
  stroke("white");
  textSize(15);
  
  stroke("black");
  fill("black");
    survivalTime=Math.ceil(frameCount/frameRate())
    text("Survival Time:"+survivalTime,250,50);
     text("Score:  "+score,130,50);


    if(gameState === PLAY){
        spawnClouds();
        spawnObstacles();
        spawnFood();
        if(keyDown("space")&& monkey.y >= 240) {
            monkey.velocityY = -8;
 
         }
        if(monkey.isTouching(bananasGroup)){
             score=score+2;
             bananasGroup.destroyEach();
         }  
         monkey.velocityY=monkey.velocityY+0.8;
         monkey.collide(invisibleGround);
      if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 2;
        obstaclesGroup.setVelocityXEach(0);
        bananasGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        bananasGroup.setLifetimeEach(-1);
        gameState=END;
        monkeySound.play();
       
    
    }
      
  
    }else if (gameState === END) {
         obstaclesGroup.destroyEach();
         cloudsGroup.setLifetimeEach(-1);
         cloudsGroup.setVelocityXEach(0);
   stroke("black");
  textSize(15);
  
  stroke("black");
  fill("red");
    survivalTime=Math.ceil(frameCount/frameRate())
    text("Survival Time:"+survivalTime,250,50);
     text("Score:  "+score,130,50);
    
      }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,200,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 500;
    
    //adjust the depth
    cloud.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}
function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(230,250);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
     bananasGroup.add(banana);
  }
}
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


