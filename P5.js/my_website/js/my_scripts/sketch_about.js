// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

var vehicles = [];
var points = [];
var img;
let portfolio;
let resume;
let textLine0;
let textLine1;
let textLine2;
let textLine3;
let textLine4;

let startPoint = [];

function preload() {
  img = loadImage("about_page.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textLine0 = createP("Xiao MA is a Creative Technologist with three years of experience in");
  textLine1 = createP("Computer Software Engineering, who is now studying Interactive");
  textLine2 = createP("Telecommunications Program (ITP) in NYU. His working ranges from");
  textLine3 = createP("Creative Coding, Front End, Installation, to Engaging Interactions,");
  textLine4 = createP("Augmented Reality and Machine Learning.");

  portfolio = createA('https://xiaoma.space/portfolio.pdf', 'Portfolio', '_blank');
  resume = createA('https://xiaoma.space/resume.pdf', 'Resume', '_blank');

  img.loadPixels();

  for (var x = 0; x < img.width; x += 2) {
    for (var y = 0; y < img.height; y += 2) {
      var index = x + y * img.width;
      var c = img.pixels[index * 4];
      var b = brightness([c]);

      if (b > 1) {

        startPoint.push(createVector(x, y));
      }
    }
  }

  console.log(startPoint[0]);

  textLine0.position(windowWidth / 2 * 0.9, windowHeight / 2 * 0.7);
  // text.style("font-size", "15pt");
  textLine0.style("font-family", "Existence");

  textLine1.position(windowWidth / 2 * 0.9, windowHeight / 2 * 0.7 + 25);
  // text.style("font-size", "15pt");
  textLine1.style("font-family", "Existence");

  textLine2.position(windowWidth / 2 * 0.9, windowHeight / 2 * 0.7 + 50);
  // text.style("font-size", "15pt");
  textLine2.style("font-family", "Existence");

  textLine3.position(windowWidth / 2 * 0.9, windowHeight / 2 * 0.7 + 75);
  // text.style("font-size", "15pt");
  textLine3.style("font-family", "Existence");

  textLine4.position(windowWidth / 2 * 0.9, windowHeight / 2 * 0.7 + 100);
  // text.style("font-size", "15pt");
  textLine4.style("font-family", "Existence");

  portfolio.position(windowWidth / 2 * 0.9, windowHeight / 2 * 0.7 + 180);
  portfolio.style("font-family", "Existence");

  resume.position(windowWidth / 2 * 0.9, windowHeight / 2 * 0.7 + 210);
  resume.style("font-family", "Existence");

  console.log(points[0], points[1]);

  for (var x = 0; x < img.width; x += 2) {
    for (var y = 0; y < img.height; y += 2) {
      var index = x + y * img.width;
      var c = img.pixels[index * 4];
      var b = brightness([c]);

      if (b > 1) {
        points.push(createVector(x - startPoint[0].x + windowWidth / 2 * 0.9 - 350,
          y - startPoint[0].y + windowHeight / 2 * 0.7));
      }
    }
  }

  for (let i = 0; i < points.length; i++) {
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