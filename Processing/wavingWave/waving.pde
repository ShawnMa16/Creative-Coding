// noise, vertex

float incr1, incr2, incr3, h, a;

PVector acc, waterPos, waterV, tempAcc;

void setup() {
  size(900, 400);
  background(0);

  acc = new PVector(0, 0);

  tempAcc = new PVector(0, 0);

  waterPos = new PVector(450, 200);

  waterV = new PVector(0, 0);
}

void draw() {
  frameRate(30);
  fill(0, 10);
  noStroke();
  rect(0, 0, width, height);
  incr2 = 300;
  incr3 = - 300;
  h = 0;
  a = 100;

  waterV.add(acc);
  waterPos.add(waterV);

  //slow down the speed;
  waterV.x *= 0.95;
  //waterV.x *= 0.99;
  waterV.y *= 0.99;

  //tempAcc.mult(0.90);

  //clear out the acceleration
  acc = new PVector(0, 0);

  if (tempAcc.y > 0.3) {
    tempAcc.mult(0.90);
  } else {
    tempAcc = new PVector(0, 0);
  }

  strokeWeight(random(.3, 2));
  for (int i = 0; i < 7; i++) {
    beginShape();
    for (float x = 0; x <= width+200; x+=100) {
      stroke(255, a);
      curveVertex(x-100 + waterV.x * 10, (height+incr3)*noise(incr1, x/incr2));
    }
    endShape();

    float ySpeed = map(abs(tempAcc.y), 0, 1.0, 0.0004, 0.003);

    if (abs(tempAcc.y) > 0.3) {
      incr1 += ySpeed;
    } else {
      incr1 += .0004;
    }
    incr1 +=.0004;
    incr2 -= 37;
    incr3 += 70;
    h += 5;
    a -= 7;
  }
}

void mouseMoved() {

  float m = 0.05;
  PVector f = new PVector(mouseX, mouseY);

  acc = (f.sub(waterPos)).div(m);
  //tempAcc = (tempF.sub(waterPos)).div(m);

  acc.normalize();

  //setting the acceleration for the waterY;
  tempAcc.set(0, acc.y);

  //acc.set(acc.x, 0);
}