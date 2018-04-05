var filter, filterFreq, filterRes;

var birdSound, waterSound, treeSound;

function preload() {
  soundFormats('mp3');
  //waterSound = loadSound("/sound/water.mp3");

  //load sound file
  waterSound = loadSound("water.mp3");
  birdSound = loadSound("bird.mp3");
  treeSound = loadSound("tree.mp3");
}

//kinect
var kinectron = null;

//water
var incr1 = 0;
var incr2 = 0;
var incr3 = 0;
var h = 0;
var a = 0;

var pg;

var t = 0;

var wavingTree = false;

var myTree;
var startPoint;
var direction;
var count;

var mapX, mapY, mapZ;

//force for water
var acc, waterPos, waterV;
var tempAcc;

//varibles for the birds
var flock;

var separationWeight = 1.5;
var cohesionWeight = 1.0;
var alignmentWeight = 1.0;
var maxSpeed = 3.0;
var maxForce = 0.05;

var yrotate1 = 0;
var yrotate2 = 0;
var change = 0.05;

//birds number
var birdNum = 400;
var birdIsScared = false;
var wavingCount;

var tempAccX = 0;

//starting point for the birds
var startX;
var startY;

var handRO = false;

//starsystem
var starsystem;

var address = {
  host: '192.168.1.2',
  port: 9001,
  path: '/'
};

function setup() {

  kinectron = new Kinectron('kinectron', address);
  kinectron.makeConnection();

  kinectron.startBodies(trackBody);

  wavingCount = 0;

  createCanvas(windowHeight, windowHeight);

  //for the projection mapping
  // Maptastic("defaultCanvas0");

  background(0);
  frameRate(60);

  //sound playing
  waterSound.loop();

  birdSound.loop();
  birdSound.setVolume(0);

  filter = new p5.LowPass();

  // Disconnect waterSound from master output.
  // Then, connect it to the filter, so that we only hear the filtered sound
  waterSound.disconnect();
  waterSound.connect(filter);

  fft = new p5.FFT();

  //background for the water
  // pg = createGraphics(900, 260);
  pg = createGraphics(windowWidth, (260 / 900) * windowHeight);
  pg.pixelDensity(1);
  pg.background(0);

  //start point for the tree
  startPoint = createVector(width / 3, (650 / 900) * windowHeight);
  direction = createVector(0, -height);

  myTree = new Tree(startPoint, direction);

  count = myTree.treeSize;

  acc = createVector(0, 0);

  tempAcc = createVector(0, 0);

  //waterPos = createVector(width / 2, height / 2);
  waterPos = createVector(450, 450);

  waterV = createVector(0, 0);

  //starting point for the birds based on the tree location
  startX = myTree.twig[parseInt(myTree.map[parseInt(count / 2)].x)].location[parseInt(myTree.map[parseInt(count / 2)].y)].x;
  startY = myTree.twig[parseInt(myTree.map[parseInt(count / 2)].x)].location[parseInt(myTree.map[parseInt(count / 2)].y)].y;

  //setup for birds
  flock = new Flock();

  //stars setup
  starsystem = new StarParticleSystem(createVector(0, 0));

}

function draw() {

  // console.log(mouseX, mouseY);

  ellipseMode(CENTER);
  noStroke();
  smooth();

  background(0);

  starsystem.addParticle();
  starsystem.run();

  var mX = mouseX,
    mY = mouseY;

  // if (mapX > 0 && mapX < width && mapZ < height && mapZ > 710) {

  // if (mapX > 0 && mapX < 940 && mapZ < 1000 && mapZ > 700) {
  // filterFreq = map(mapX, 70, 935, 20, 10000);
  if (mouseX > 0 && mouseX < width && mouseY < height && mouseY > (610 / 900) * windowHeight) {
    filterFreq = map(mouseX, 0, width, 20, 10000);
    // Map mouseY to resonance (volume boost) at the cutoff frequency
    // filterRes = map(mouseY, 610, height, 0, 20);
    filterRes = 10;

  }
  // set filter parameters
  filter.set(filterFreq, filterRes);

  if (handRO) {
    var panValue = map(mouseX, 0, width, -1, 1);

    // var panValue = map(mapX, 70, 935, -1, 1);
    birdSound.pan(panValue);

    // var speed = map(mouseY, 0, height, 0, 4);
    // birdSound.rate(speed);
    var birdV = map(flock.boids.length, 0, birdNum / 15, 0, 1.2);

    // var vol = map(mapZ, 0, 1200, 0.01, 1.5);
    //birdSound.amp(vol);

    birdSound.amp(birdV);
    //birdSound.playMode('sustain');
  }
  //birdSound.play();
  else {
    birdSound.setVolume(0, 2);
  }

  //console.log("volume", birdV);

  //birdSound.setVolume(birdV);

  // Draw every value in the FFT spectrum analysis where
  // x = lowest (10Hz) to highest (22050Hz) frequencies,
  // h = energy (amplitude / volume) at that frequency
  // var spectrum = fft.analyze();

  //---------------------- drawing out the tree -------------------------------
  // if (mouseY > 350 && mouseY < 550 && mouseX < 500 && mouseX > 150) {
  if (dist(mouseX, mouseY, startX, startY) < 200) {
    // if (dist(mapX, mapZ, startX, startY) < 200) {

    handRO = true;

    // if (birdSound.isPlaying()) {
    //   birdSound.pause();
    // } else {
    //   birdSound.play();
    // }
    //birdSound.setVolume(1, 3);
    // if (treeSound.isPlaying()) {
    //   treeSound.stop();
    // } else {
    //   treeSound.play('sustain');
    // }
    //  birdSound.play();
    myTree.swing(acc.x);
    //console.log(acc.x);
    if (abs(acc.x) > 0.4) {
      birdIsScared = true;
      wavingCount++;
      var startPosition = createVector(startX, startY);

      //birds less then 200
      if (wavingCount < birdNum) {
        flock.addBoid(new Boid(startX, startY));
      }
    }
  } else {
    handRO = false;
    myTree.swing(0);
  }
  stroke(255);
  var tempIndex;
  var i;
  //console.log(count);

  for (i = 1; i < count; i++) {
    strokeWeight(myTree.twig[parseInt(myTree.map[i].x)].thickness[parseInt(myTree.map[i].y)]);
    line(myTree.twig[parseInt(myTree.map[i].x)].location[parseInt(myTree.map[i].y) - 1].x,
      myTree.twig[parseInt(myTree.map[i].x)].location[parseInt(myTree.map[i].y) - 1].y,
      myTree.twig[parseInt(myTree.map[i].x)].location[parseInt(myTree.map[i].y)].x,
      myTree.twig[parseInt(myTree.map[i].x)].location[parseInt(myTree.map[i].y)].y);
  }

  //drawing for the leaves
  // noStroke();
  // for (i = 0; i < myTree.twig.length; i++) {
  //   var num = myTree.twig[i].location.length - 1;
  //   ellipse(myTree.twig[i].location[num].x, myTree.twig[i].location[num].y, 4, 4);
  // }
  //------------------------------ finish -------------------------------------

  // console.log(myTree.twig.length);
  drawWater();

  //control the bird fly;
  if (birdIsScared) {
    flock.run();
    flock.cleanTheDead();
  }
  //
  // push();
  // fill(255, 0, 0);
  // ellipse(mapX, mapZ, 20, 20);
  // pop();
}

//--------------------------- kinect tracking ---------------------------------

var tracking = false;
var playerID = null;
// var playerID;
var playerInRange = false;

function trackBody(allbodies) {
  // console.log('bodies found');

  var bodies = allbodies.bodies;

  for (var i = 0; i < bodies.length; i++) {
    // console.log('hi');
    // if ((!tracking && bodies[i].tracked) == false) window.location.reload(false);
    if (!tracking && bodies[i].tracked == true) {
      console.log("getting player");
      // console.log(bodies[i]);
      // debugger;
      playerID = bodies[i].trackingId;

      // if (!playerID) window.location.reload(false);

      if (bodies[i].joints[1].depthX > 0.40 && bodies[i].joints[1].depthX < 0.70 &&
        bodies[i].joints[1].cameraZ < 1.80) {
        playerInRange = true;
        tracking = true;
        console.log("player is in range");
        // setup();
      }
      // window.location.reload(false);
    }


    if (bodies[i].trackingId == playerID) {
      // draw the wrist
      console.log("drawing", playerID);

      if (tracking == true && playerInRange == true) {

        var bodyx = bodies[i].joints[10].depthX;
        var bodyz = bodies[i].joints[10].cameraZ;

        mapY = bodies[i].joints[10].cameraY;

        //using the cooradinate X as the mouseX
        //using the cooradinate Z as the mouseY
        mapX = map(bodyx, 0.345, 0.735, 70, 935);
        mapZ = map(bodyz, 0.68, 1.60, 15, 950);

        console.log(bodyx, bodyz);

        // var m = 0.05;
        // var f = createVector(mapX, mapZ);
        //
        // acc = (f.sub(waterPos)).div(m);
        //
        // acc.normalize();
        //
        // tempAcc.set(0, acc.y);
        //
        // acc.set(acc.x, 0);
        //
        // if (bodies[i].joints[1].depthX > 0.8 || bodies[i].joints[1].depthX < 0.3 ||
        //   bodies[i].joints[1].cameraZ > 1.8) {
        //   tracking = false;
        //   playerInRange = false;
        //   window.location.reload(false);
        // }
      }
    }
  }
}

//------------------------------- finish --------------------------------------


// using the mouse to control the acceleration
function mouseMoved() {
  var m = 0.05;
  var f = createVector(mouseX, mouseY);

  acc = (f.sub(waterPos)).div(m);

  acc.normalize();

  //setting the acceleration for the waterY;
  tempAcc.set(0, acc.y);

  //acc.set(acc.x, 0);

  //console.log(acc.y, mapZ);


  // tempAcc.sub(acc.x, 0);
  // acc.x = tempX;

  // console.log(acc, tempAcc);
  //console.log(acc.x);
}


//----------------------- drawing out the water -------------------------------
function drawWater() {


  push();
  fill(0);
  stroke(255);
  strokeWeight(2);
  // bezier(0, 660, 400, 660, 600, 600, 900, 660);
  bezier(0, 660 / 900 * windowHeight, 400 / 900 * windowHeight,
    660 / 900 * windowHeight, 600 / 900 * windowHeight, 600 / 900 * windowHeight,
    900 / 900 * windowHeight, 660 / 900 * windowHeight);
  pop();

  //transparency 5;
  pg.fill(0, 5);
  pg.noStroke();
  //setting reflashing rectangle background for the wave
  pg.rect(0, 0, width, 350);

  incr2 = 300;
  incr3 = -250;
  h = 0;
  a = 100;

  pg.strokeWeight(random(1.3, 2));

  //adding force to the water rather then using the mouseX,Y.
  waterV.add(acc);
  waterPos.add(waterV);

  //slow down the speed;
  waterV.x *= 0.95;
  //waterV.x *= 0.99;
  waterV.y *= 0.99;


  if (tempAcc.y > 0.3) {
    tempAcc.mult(0.90);
  } else {
    tempAcc = createVector(0, 0);
  }


  //clear out the acceleration
  acc = createVector(0, 0);

  //console.log(waterV.x, waterV.y);
  // console.log(waterPos.x, waterPos.y);

  //drawing the lines(water)
  for (var w = 0; w < 7; w++) {
    pg.beginShape();
    for (var x = 0; x <= width + 500; x = x + 100) {
      pg.stroke(255, a);

      // if (mapZ > 630 && mapZ < 945) {
      if (mouseY > 610 / 900 * windowHeight && mouseY < windowHeight) {

        if (x == 100) {
          pg.curveVertex(x - 100,
            (height - 610 + incr3) * noise(incr1, x / incr2 - 100));

        } else {
          //waving X
          pg.curveVertex(x - 100 + waterV.x * 10,
            (height - 610 + incr3) * noise(incr1, x / incr2 - 100));
        }
      } else {
        pg.curveVertex(x - 100,
          (height - 610 + incr3) * noise(incr1, x / incr2 - 100));
      }
    }
    pg.endShape();

    // console.log(tempAcc.y);
    // incr1 += .0004;
    var ySpeed = map(abs(tempAcc.y), 0, 1.0, 0.0004, 0.003);

    // if (abs(tempAcc.y) > 0.8 && mouseY > 650 && mouseY < 945) {
    if (abs(tempAcc.y) > 0.3 && mouseY > 550 && mouseY < 900) {
      incr1 += ySpeed;
    } else {
      incr1 += .0004;
    }


    //control the waving speed

    //incr1 += .0004;
    //
    incr2 -= 127;
    //control the distance between each line
    incr3 += 70;

    h += 5;
    //transparency
    a -= 10;
  }

  image(pg, 0, height - (240 / 900 * windowHeight));
}

window.onload = () => {
  console.log(document.getElementById('defaultCanvas0'));
}