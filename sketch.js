var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var pink , yellow , red , obstacles ;
var pinkImg1 , pinkImg2 , yellowImg1 , yellowImg2 , redImg1 , redImg2  , obstacle1Image , obstacle2Image , obstacle3Image

var pinkImg12 , yellow21 , red31;


var pinkCG , yellowCG , redCG , cycleBell ,  obstaclesG ; 


var END =0;
var PLAY =1;
var gameState = PLAY;
var gameOver , gameOverImage;

var distance=0;

function preload(){
pathImg = loadImage("images/Road.png");
mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
mainRacerImg2= loadAnimation("images/mainPlayer3.png");
gameOverImage = loadImage("images/gameOver.png")
pinkImg1=loadAnimation("images/opponent1.png","images/opponent2.png");
  
pinkImg2=loadAnimation("images/opponent3.png")
  
yellowImg1=loadAnimation("images/opponent4.png","images/opponent5.png")
  
yellowImg2=loadAnimation("images/opponent6.png")
  
redImg1=loadAnimation("images/opponent7.png","images/opponent8.png")
  
redImg2=loadAnimation("images/opponent9.png")
  
pinkImg12=loadAnimation("images/1.png")

  

  
obstacle1Image=loadAnimation("images/obstacle1.png")
obstacle2Image=loadAnimation("images/obstacle2.png")
obstacle3Image=loadAnimation("images/obstacle3.png")
  
cycleBell= loadSound("sounds/bell.mp3");
  
}

function setup(){
  
createCanvas(700,330);
   
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;
path.scale=0.5

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
gameOver=createSprite(370,130)
gameOver.addImage(gameOverImage)
gameOver.scale=0.6
gameOver.visible = false;
  
pinkCG = new Group()
yellowCG = new Group()
redCG = new Group()
coinG = new Group()
obstacle1G = new Group()
obstacle2G = new Group()
obstacle3G = new Group()
  
mainCyclist.setCollider("circle",0,0,500);
mainCyclist.debug = false;
}

function draw() {
background(0);
  
drawSprites();
textSize(20);
fill(255);
text("Distance: "+ distance,500,30);
  
  if(gameState===PLAY){
    
   mainCyclist.y = World.mouseY;
  
  edges= createEdgeSprites();
  mainCyclist.collide(edges); 
  
  distance=distance+Math.round(getFrameRate()/50)
  
  path.velocityX=-(6+2*distance/150)
    
  
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  var select_opponentCycles=Math.round(random(1,6))
  
  if(World.frameCount%50==0){
  if(select_opponentCycles==1){
  pinkCyclists();
  }else if (select_opponentCycles==2){
  yellowCyclists();
  }else if (select_opponentCycles==3){
  redCyclists();
  } else if (select_opponentCycles==4){
  obstacle12() 
  }else if (select_opponentCycles==5){
    obstacle21()
    }else{
    obstacle32()
  }
  }
  if(keyDown("space")){
   cycleBell.play() ;
 } 
    
    
  
  
    
    
    if(pinkCG.collide(mainCyclist)){
    
 mainCyclist.addAnimation("SahilRunning",mainRacerImg2);    
  pink.addAnimation("pink",pinkImg2)
  pink.velocityX=0
  path.velocityX = 0;
  gameState=END
  }
  
  if(yellowCG.isTouching(mainCyclist)){
   mainCyclist.addAnimation("SahilRunning",mainRacerImg2);    
  yellow.addAnimation("yellow",yellowImg2)
  yellow.velocityX=0
  path.velocityX = 0;
  gameState=END
 
  }
    if(redCG.isTouching(mainCyclist)){
   mainCyclist.addAnimation("SahilRunning",mainRacerImg2);    
  red.addAnimation("red",redImg2)
  red.velocityX=0
  path.velocityX = 0;
  gameState=END
 
  }
    
  if(obstacle1G.isTouching(mainCyclist)){
 mainCyclist.addAnimation("ShailRunning",mainRacerImg2);
     obstacle1.velocityX=0
     path.VelocityX=0
     gameState=END
     }
    if(obstacle2G.isTouching(mainCyclist)){
 mainCyclist.addAnimation("ShailRunning",mainRacerImg2);
     obstacle2.velocityX=0
     path.VelocityX=0
     gameState=END
     }
    if(obstacle3G.isTouching(mainCyclist)){
 mainCyclist.addAnimation("ShailRunning",mainRacerImg2);
     obstacle3.velocityX=0
     path.VelocityX=0
     gameState=END
     }
     
    
  
  }
  
  if(gameState === END) {
   gameOver.visible = true;
    textSize(18)
    fill("white")   
    textSize(20);
    text("PRESS UP ARROW TO RESTART THE GAME",170,190);
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
    mainCyclist.velocityX = 0;
    path.velocityX = 0;
    pinkCG.setVelocityXEach(0)
    yellowCG.setVelocityXEach(0)
    redCG.setVelocityXEach(0)
    obstacle1G.setVelocityXEach(0)
    obstacle2G.setVelocityXEach(0)
    obstacle3G.setVelocityXEach(0)
    
    
  }
  if(keyDown("UP_ARROW")){
   reset()
 } 
    }


function pinkCyclists(){
  
  pink=createSprite(700,Math.round(random(50,250),10,10));
  pink.addAnimation("pink",pinkImg1)
  pink.velocityX=-(6+2*distance/150);
  pink.scale=0.07;
  pink.setLifetime=150;
  pinkCG.add(pink)
 }

function yellowCyclists(){
  
  yellow=createSprite(700,Math.round(random(50,250),10,10));
  yellow.addAnimation("yellow",yellowImg1)
  yellow.velocityX=-(6+2*distance/150);
  yellow.scale=0.07;
  yellow.setLifetime=150;
  yellowCG.add(yellow)
}

function redCyclists(){
  
  red =createSprite(600,Math.round(random(20,250),10,10));
  red.addAnimation("red",redImg1)
  red.velocityX=-(6+2*distance/150);
  red.scale=0.07;
  red.setLifetime=150;
  redCG.add(red);
}

function obstacle12(){
  obstacle1=createSprite(700,Math.round(random(50,250),10,10))
  obstacle1.addAnimation("obt",obstacle1Image)
  obstacle1.velocityX=-(6+2*distance/150);
  obstacle1.scale=0.1
  obstacle1.setLifetime=150
  obstacle1G.add(obstacle1);
}

function obstacle21(){
  obstacle2=createSprite(700,Math.round(random(50,250),10,10))
  obstacle2.addAnimation("obs",obstacle2Image)
  obstacle2.velocityX=-(6+2*distance/150);
  obstacle2.scale=0.1
  obstacle2.setLifetime=150
  obstacle2G.add(obstacle2);
}

function obstacle32(){
  obstacle3=createSprite(700,Math.round(random(50,250),10,10))
  obstacle3.addAnimation("ob",obstacle3Image)
  obstacle3.velocityX=-(6+2*distance/150);
  obstacle3.scale=0.03
  obstacle3.setLifetime=150
  obstacle3G.add(obstacle3);
}
  function reset(){
  
  gameState=PLAY

  mainCyclist.addAnimation("SahilRunning",mainRacerImg1)

  pinkCG.destroyEach()
  yellowCG.destroyEach()
  redCG.destroyEach()
  obstacle1G.destroyEach()
  obstacle2G.destroyEach()
  obstacle3G.destroyEach()
  distance=0
  gameOver.visible = false;
  
}


function spawnObstacles() {
  obstacles = createSprite(650,Math.round(random(50,250)),10,10);
  obstacles.velocityX= -3;
  obstacles.setLifetime=70;
  obstacles.scale=0.09;
  mainCyclist.depth=obstacles.depth-1;
  obstaclesG.add(obstacles);
  var rand = Math.round(random(1,300));
    switch(rand) {
      case 1: obstacles.addImage(obstacle1Image);
              break;
      case 2: obstacles.addImage(obstacle2Image);
              break;
      case 3: obstacles.addImage(obstacle3Image);
              break;
      default: break;
    }
}
  