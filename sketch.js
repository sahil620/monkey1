var PLAY = 1;
var END = 0; 
var gameState = PLAY ;

var monkey , monkey_running,ground,invisibleGround;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var jumpSound,gameOver,gameOverImage;
var score = 0;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =   loadAnimation ("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png",
                                    "sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 // jumpSound = loadSound("jump.mp3");
 // gameoverImage = loadImage("gameOver.jpg");
 
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
}



function setup() {
createCanvas(600,400);
   var survivalTime = 0; 
  
   //creating the monkey
   monkey = createSprite(80,315,20,20);
   monkey.addAnimation("running",monkey_running);
   monkey.scale = 0.1;
  
   ground = createSprite(400,350,900,10);
   ground.velocityX = -6
 
   invisibleGround = createSprite(400,360,900,10);
   invisibleGround.visible = false;
  
   //gameOver = createSprite(300,200);
   //gameOver.addImage(gameoverImage);
  
   monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
   monkey.debug = false
}


function draw() {
  background(220);
   
  //giving score
  stroke("white");
  textSize(20);
  fill("black");
  text("score :" + score,500,50);
  
  //giving survival time
  stroke("blue");
  textSize(20);
  fill("blue");
  text("Survival time :" + survivalTime,50,50);
  survivalTime = Math.ceil(frameCount/frameRate())
  
   if(gameState === PLAY) {
  
   if(keyDown("space")&& monkey.y >= 100){
     monkey.velocityY = -10;
     //jumpSound.play();
   }
   
   //gameOver.visible = false;
    monkey.velocityY = monkey.velocityY + 0.8;
  
    ground.x = ground.width /2;
    console.log(ground.x);
    monkey.collide(invisibleGround);
   
    ground.depth = monkey.depth;
    monkey.depth = monkey.depth+1;
  
    spawnBananas();
  spawnObstacles();
     
      if(obstacleGroup.isTouching(monkey)){
      
      gameState = END;
      ground.velocityX = false;
      FoodGroup.visible = false;
      obstacleGroup.visible = false;
      obstacleGroup.velocityX = 0;
      
      }
     if (monkey.isTouching(FoodGroup)){
       score = score+1;
         
         }
   }
   else if (gameState === END) {
  
     monkey.visible = false;
     obstacleGroup.visible = false;
     //gameOver.visible = true;
   }
  monkey.collide(invisibleGround);
  
  if (mousePressedOver(gameOver)) {
      reset();
   }
 
 drawSprites(); 
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  monkey.visible = true;
  ground.visible = true;
  score = 0;
  survivalTime = 0;
}

function spawnBananas (){
  if (frameCount % 80 === 0 ){
    var banana = createSprite(300,200,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.scale = 0.1/2;
    
    banana.lifetime = 80;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles (){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(450,310,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -2;
    obstacleGroup.add(obstacle);
  }
}





