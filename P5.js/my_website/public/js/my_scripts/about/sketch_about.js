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

let notification;

let emailAddress;

let startPoint = [];

$(window).on('load', function () {
  // PAGE IS FULLY LOADED  
  // FADE OUT YOUR OVERLAYING DIV
  $('#overlay').fadeOut(500);
});

function preload() {
  img = loadImage("/assests/about_page.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textLine0 = createP("Xiao MA is a Creative Technologist with three years of experience in");
  textLine1 = createP("Computer Software Engineering, who is now studying Interactive");
  textLine2 = createP("Telecommunications Program (ITP) in NYU. His working ranges from");
  textLine3 = createP("Creative Coding, Front End, Installation, to Engaging Interactions,");
  textLine4 = createP("Augmented Reality and Machine Learning.");
  notification = createP("I built my own website.");

  portfolio = createA('https://xiaoma.space/assests/portfolio.pdf', 'Portfolio', '_blank');
  resume = createA('https://xiaoma.space/assests/resume.pdf', 'Resume', '_blank');
  emailAddress = createA("mailto:emailme.mx@gmail.com", 'Email');

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

  // console.log(startPoint[0]);

  textLine0.position(windowWidth / 2 * 0.9, windowHeight / 2 * 0.7);
  // text.style("font-size", "15pt");
  textLine0.style("font-family", "Avenir");

  textLine1.position(windowWidth / 2 * 0.9, windowHeight / 2 * 0.7 + 25);
  // text.style("font-size", "15pt");
  textLine1.style("font-family", "Avenir");

  textLine2.position(windowWidth / 2 * 0.9, windowHeight / 2 * 0.7 + 50);
  // text.style("font-size", "15pt");
  textLine2.style("font-family", "Avenir");

  textLine3.position(windowWidth / 2 * 0.9, windowHeight / 2 * 0.7 + 75);
  // text.style("font-size", "15pt");
  textLine3.style("font-family", "Avenir");

  textLine4.position(windowWidth / 2 * 0.9, windowHeight / 2 * 0.7 + 100);
  // text.style("font-size", "15pt");
  textLine4.style("font-family", "Avenir");


  notification.position(windowWidth / 2 * 0.9, windowHeight / 2 * 0.7 + 150);
  notification.style("font-family", "Avenir");

  portfolio.position(windowWidth / 2 * 0.9, windowHeight / 2 * 0.7 + 200);
  portfolio.style("font-family", "Avenir");

  resume.position(windowWidth / 2 * 0.9, windowHeight / 2 * 0.7 + 230);
  resume.style("font-family", "Avenir");

  emailAddress.position(windowWidth / 2 * 0.9, windowHeight / 2 * 0.7 + 260);
  emailAddress.style("font-family", "Avenir");

  // console.log(points[0], points[1]);

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
  background(255, 150);
  // blendMode(ADD);
  // fill(0);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}