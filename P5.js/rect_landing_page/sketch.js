// array for rectangles
let rects = [];
let numbOfRects = 7;

// the same degree as in the rect.js file
let angle;

// offset of the rectangles
let offSetX = 35;

function setup() {

  angle = PI / 9.0;

  let myCanvas = createCanvas(600, 600);
  for (let i = 0; i < numbOfRects; i++) {
    rects.push(new Rectangle(400 - i * offSetX, 200 + i * offSetX * tan(angle), i));
  }

}

function draw() {
  background(255);
  rects.forEach((rect) => {
    rect.render();
    // console.log(rect);
  });
}