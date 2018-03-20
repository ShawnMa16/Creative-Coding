var balls = [];

var slider;

function setup() {
  createCanvas(600, 600);

  slider = createSlider(0, 360, 180, 40);
  slider.position(260, 610);
  slider.style('width', '80px');

}

function draw() {
  background(0);

  for (var i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].render();
    if (balls[i].ballisFinished()) {
      balls.splice(i, 1);
    }
  }
}

function mousePressed() {
  if (mouseY < 600) {
    for (var i = 0; i < slider.value(); i++) {
      balls.push(new Ball((mouseX + random(-30, 30)), mouseY + random(-30, 30)));
    }
  }
}