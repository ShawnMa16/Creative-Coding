// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

var vehicles = [];
var points = [];
var img;

function preload() {
  img = loadImage("about_page.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  img.loadPixels();
  for (var x = 0; x < img.width; x += 5) {
    for (var y = 0; y < img.height; y += 5) {
      var index = x + y * img.width;
      var c = img.pixels[index * 4];
      var b = brightness([c]);

      if (b > 1) {
        _x = (x / img.width) * windowWidth;
        _y = (y / img.height) * windowHeight;
        points.push(createVector(_x, _y));
      }
    }
  }

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
  // clear();
  background(255, 80);
  // blendMode(ADD);
  // fill(0);

  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}