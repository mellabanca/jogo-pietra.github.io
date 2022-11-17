var fazenda;
var up, up1, up2, up3;
var pennywise;
var detetive, predio, azul, blue, it;
var vida, morte;
var placar = 0;
var playing = 0;
var die = 1;
var videogame = playing;
var naoaperte, aperte;
var detona, ralph;
var canguroo, classico;


function preload(){
  fazenda = loadImage ("./assets/bg.png");
  up1 = loadAnimation("./assets/balloon1.png", "./assets/balloon2.png", "./assets/balloon3.png");
  pennywise = loadAnimation("./assets/balloon1.png");
  detetive = loadImage("./assets/obsBottom1.png");
  azul = loadImage ("./assets/obsBottom2.png");
  predio  = loadImage ("./assets/obsBottom3.png");
  it = loadImage ("./assets/obsTop1.png");
  blue = loadImage ("./assets/obsTop2.png");
  naoaperte = loadImage("./assets/restart.png");
  detona = loadImage ("./assets/fimdejogo.png");
  canguroo = loadSound ("./assets/jump.mp3");
  classico = loadSound ("./assets/die.mp3");
}

function setup() {
  createCanvas(1570, 805);

  up = createSprite(90, 150, 50, 50);
  up.addAnimation("altasaventuras", up1);
  up.addAnimation("itacoisa", pennywise);
  up.changeAnimation("altasaventuras");
  up.scale = 0.45;
  
  aperte = createSprite(width/2, height/2+70);
  aperte.addImage (naoaperte);
  aperte.scale = 0.8;

  ralph = createSprite(width/2, height/2);
  ralph.addImage (detona);
  ralph.scale = 1;

  up.debug = false;

  vida = new Group();
  morte = new Group();
}

function draw() {
  background(fazenda);

  if(videogame === playing){
    if(keyDown ("UP_ARROW")){
      up.velocityY = -15;
      canguroo.play();
    }
    up.velocityY += 1.3;

    ar();
    terra();

    placar += Math.round(frameRate()/60.3);

    if(vida.isTouching (up) || morte.isTouching (up) || up.y > 820 ){
      videogame = die;
      classico.play();
    }

    aperte.visible = false;
    ralph.visible = false;
  }
  else if(videogame === die){
   aperte.visible = true;
   ralph.visible = true;

   vida.setVelocityXEach(0);
   morte.setVelocityXEach(0);
   up.velocityY = 0;

   vida.setLifetimeEach(-18);
   morte.setLifetimeEach(-18);

   up.changeAnimation("itacoisa");

   if(mousePressedOver(aperte)){
     tempo ();
   }
  }

  drawSprites();
  
  textSize(20);
  fill("black");
  stroke("black");
  text("placar:" + placar, 30, 40);
  
}

function ar (){
  if(frameCount % 80 === 0){
    oxigenio = createSprite(1600, random(0, height/2), 45, 45);
    oxigenio.velocityX = -5;
    oxigenio.debug = false;
    pi = Math.round(random(1,2));
    switch(pi){
      case 1: oxigenio.addImage(blue)
              oxigenio.scale = 0.15;
      break;
      case 2: oxigenio.addImage(it)
              oxigenio.scale = 0.15;
      break;
      default: break;
    }
    oxigenio.lifetime = 330;

    oxigenio.depth = aperte.depth;
    oxigenio.depth = ralph.depth;
    aperte.depth += 1;
    ralph.depth += 1;

    vida.add(oxigenio);
  }
}

function terra (){
  if(frameCount % Math.round (random (60, 100)) === 0){
    solo = createSprite(1600, 750, 45, 45);
    solo.velocityX = -5;
    solo.debug = false;
    circulo = Math.round(random(1, 3));
    switch(circulo){
      case 1: solo.addImage(detetive)
              solo.scale = 0.25;
              solo.y = 590;
      break;
      case 2: solo.addImage(predio)
              solo.scale = 0.25;
              solo.y = 570;
      break;
      case 3: solo.addImage(azul)
              solo.scale = 0.15;
              solo.y = 680;
      break;
      default: break;
    }
    solo.lifetime = 370; 
    
    solo.depth = aperte.depth;
    solo.depth = ralph.depth;
    aperte.depth += 1;
    ralph.depth += 1;

    morte.add(solo);
  }
}

function tempo(){
  videogame = playing;
  up.y = 150;
  up.changeAnimation("altasaventuras");
  vida.destroyEach();
  morte.destroyEach();
  placar = 0;
}