var path,boy,cash,diamonds,jwellery,sword,boy_collideImg;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gameOverImg

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  boy_collideImg=loadAnimation("runner1.png")
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  gameOverImg= loadImage("gameOver.png")
}

function setup(){
  
  createCanvas(400,500);
// Moving background
path=createSprite(200,200,200,500);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("collide",boy_collideImg)
boy.scale=0.045;
  
gameOver = createSprite(200,150,100,10)
  gameOver.addImage("gameOver",gameOverImg)
  gameOver.scale=0.8
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
  
  
}

function draw() {

  background(0);
  if (gameState===PLAY)
{
  boy.x = World.mouseX;
  gameOver.visible=false
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection+10
    
  }else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection+100
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection+50
      
    }else{
      if(swordGroup.isTouching(boy)) {
        
        gameState=END
    }
  }
  }
  
  if(gameState===END){
    gameOver.visible=true
    path.velocityY=0
    cashG.setVisibleEach(false)
    diamondsG.setVisibleEach(false)
    jwelleryG.setVisibleEach(false)
    boy.visible=false
    swordGroup.setVisibleEach(false)
    boy.changeAnimation("collide")
    }



  drawSprites();
  textSize(20);
  fill(255);
  textFont('Algerian')
  text("Treasure: "+ treasureCollection,150,30);
  

}

function createCash() {
  if (World.frameCount % 80 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 190;
  cashG.add(cash);
    
     }
}

function createDiamonds() {
  if (World.frameCount % 500 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 190;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 200 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 190;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 140 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 190;
  swordGroup.add(sword);
  }
}