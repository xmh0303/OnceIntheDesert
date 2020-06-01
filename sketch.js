var sky;
var ground;
var water;
var tree;
var treeTexture;
var leaves;
var leavesTexture;
var fruits;
var cactus;
var cactusFlower;
var flowerRotate = 0;
var cactusTexture;
var desert;
var groundTime;
var groundPositionX;
var groundPositionY = 700;
var desertPositionY = 800;
var waterPositionX = 700;
var waterPositionY = 200;
var treePositionY = 500;
var treeScale = 0;
var cactusPositionY = 500;
var cactusScale = 0;
var rainPositionY = -500;
var timeStep;
var skyRotate = 0;
var lightValue = 200;
var d = 0;
var bgm;
var rain;


function preload() {
  sky = loadImage('src/sky04.png');
  cactusTexture = loadImage('src/cactusTexture01.jpg');
  treeTexture = loadImage('src/treeTexture01.jpg');
  leavesTexture = loadImage('src/leavesTexture01.jpg');

  ground = loadModel('src/ground02.obj');
  water = loadModel('src/water02.obj');
  tree = loadModel('src/tree03.obj');
  leaves = loadModel('src/tree04.obj');
  fruits = loadModel('src/fruits01.obj');
  desert = loadModel('src/desert01.obj');
  cactus = loadModel('src/cactus01.obj');
  cactusFlower = loadModel('src/cactusFlower01.obj');
}

function setup() {
  createCanvas(windowWidth , windowHeight, WEBGL);
  bgm = createAudio('src/lonely.mp3');
  rain = createAudio('src/rain01.mp3');
  // bgm.autoplay(true);
}

function draw() {
  noStroke();
  background(51);
  camera(0, 0, (height/2.0) / tan(PI*30.0 / 180.0), 0, 0, 0, 0, 1, 0);

  ambientLight(lightValue);
  if(20 <= timeStep && timeStep < 25){ 
    lightValue += -1/2;
  }  if(30 <= timeStep){ 
    lightValue += 1/2;
  } 

  pointLight(255, 255, 255, 0, 300, 300);
  pointLight(255, 255, 255, 0, 0, 2000);
  // spotLight(255, 0, 0, 0, 0, 0);

  timeStep = frameCount / 60;
  waterTime();
  groundTime();
  treeTime();
  desertTime();
  cactusTime();

  // push();
  // box();
  // pop();

  //sky
  push();
  texture(sky);
  rotateY(PI/2 + skyRotate);
  sphere(1000);
  pop();

  //water
  push();
  translate(waterPositionX, waterPositionY, 0);
  // scale(4)
  fill(0, 119, 179);
  model(water);
  pop();

  //ground
  push();
  translate(0, groundPositionY, 0);
  scale(4);
  rotateX(PI);
  rotateY(PI/4);
  fill(0, 77, 26);
  model(ground);
  pop();

  //tree
  push();
  translate(0, treePositionY, 90);
  rotateX(PI);
  scale(treeScale);
  texture(treeTexture)
  model(tree);

  push();
  texture(leavesTexture);
  model(leaves);
  pop();

  if (d == 1) {
    push();
    fill(200, 70, 50);
    model(fruits)
    pop();
  }

  pop();

  //desert
  push();
  translate(0, desertPositionY, 0);
  scale(4);
  rotateX(PI);
  rotateY(PI/4);
  fill(161,128,63);
  model(desert);
  pop();

  //cactus
  push();
  translate(0, cactusPositionY, 10);
  scale(cactusScale);
  rotateX(PI/2);
  texture(cactusTexture);
  model(cactus);

  if(d >= 2){
    push();
    translate(9, cactusPositionY, 200);
    if (d % 2 == 0){
      rotateX(-PI/2);
    } else if (d % 2 == 1) {
      rotateX(-PI/2);
      rotateZ(flowerRotate);
    }
    scale(0.5);
    fill(200, 80, 0);
    model(cactusFlower);
    pop();
  }
  pop();

  // //rain
  // for(i = 0; i < 1000; i ++){
  //   push();
  //   translate(random(-2000, 2000), random(0, 1000) + rainPositionY, random(-2000, 2000));
  //   fill(0, 200);
  //   cylinder(3, random(100, 200));
  //   pop();
  // }
  // rainPositionY += 10;

  console.log(frameCount/60, cactusScale);

  flowerRotate += radians(2);
  skyRotate += radians(1/60);
  if(24 <= timeStep && timeStep < 33){ 
    skyRotate += radians(7);
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    bgm.play();
  } else if (keyCode === 65) {
    rain.play();
  } else if (keyCode === 83) {
    rain.stop();
  }
}

function waterTime() {
  if(0 <= timeStep && timeStep < 20){ 
    waterPositionX += -1/2;
  }  if(20 <= timeStep && timeStep < 21){ 
    waterPositionX += 1/2;
    waterPositionY += -1/2;
  }  if(21 <= timeStep && timeStep < 22){ 
    waterPositionX += -1/2;
    waterPositionY += -1/2;
  }  if(22 <= timeStep && timeStep < 23){ 
    waterPositionX += 1/2;
    waterPositionY += -1/2;
  }  if(23 <= timeStep && timeStep < 24){ 
    waterPositionX += -1/2;
    waterPositionY += -1/2;
  }  if(24 <= timeStep && timeStep < 33){ 
    waterPositionX += 1/2;
  } if(33 <= timeStep && timeStep < 52 ){ 
    waterPositionX += 1/2;
    waterPositionY += 1/2;
  } if(52 <= timeStep){ 
    waterPositionX += 0;
    waterPositionY += 0;
  }
}

function groundTime() {
  if(0 <= timeStep && timeStep < 10){ 
    groundPositionY += -1/2;
  } if(23 <= timeStep) { 
    groundPositionY += 1/2;
  }
}

function desertTime() {
  if(30 <= timeStep && timeStep < 35){ 
    desertPositionY += -1/2;
  } 
}

function treeTime() {
  if(7 <= timeStep && timeStep < 17){ 
    treePositionY += -1/2;
    treeScale += 0.08/(60 * 10); //frameRate * 10
  }if(21 <= timeStep && timeStep < 24){ 
    treeScale += -0.08/(60 * 10); //frameRate * 10
    treePositionY += 1/4;
  }if(24 <= timeStep){ 
    treeScale = 0; //frameRate * 10
  }
}

function cactusTime() {
  if(40 <= timeStep && timeStep < 47){ 
    cactusPositionY += -1/2;
    cactusScale += 1/(60 * 5); //frameRate * 10
  }
}

function mousePressed() {
  d += 1;
}
