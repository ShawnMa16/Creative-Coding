let faces = [];

let left_eye_index = [6];
let left_eye

let right_eye_index = [6];
let right_eye;

function setup() {
  // put setup code here

  createCanvas(540, 720);
  rectMode(CENTER);

  left_eye = new Eye(createArea(6, 100, 49, 31));
  right_eye = new Eye(createArea(6, 100, 49, 31));

}

function draw() {
  // put drawing code here
  background(255);
  for (let i = 0; i < faces.length; i++) {
    faceDect(faces[i]);
    // console.log(faces[i]);
  }
}

function faceDect(face) {

  if (face.state === brfv4.BRFState.FACE_TRACKING_START || face.state === brfv4.BRFState.FACE_TRACKING) {
    face.points.forEach(function (point) {
      // fill(255);
      // ellipse(point.x, point.y, 5, 5);
      // console.log(point);
    });

    // pushing data for left eye
    for (let i = 0; i < face.points.length; i++) {
      if (35 < i && i < 42) {
        left_eye_index[i - 36] = face.points[i];
        // console.log(face.points[i]);
      }
      if (41 < i && i < 48) {
        right_eye_index[i - 42] = face.points[i];
        // console.log(face.points[i]);
      }
    }

    // console.log(left_eye_index);
    left_eye.update(left_eye_index);
    left_eye.display();

    right_eye.update(right_eye_index);
    right_eye.display();
  }
}

// function for creating areas for facial features
function createArea(number, R, G, B) {
  let area = [number];
  for (let i = 0; i < number; i++) {
    area[i] = {
      x: 0,
      y: 0,
      w: (Math.random() * 10 + 50),
      h: (Math.random() * 3 + 50) * 0.75,
      a: (Math.random() * 50) + 50,
      r: R + Math.random() * 50,
      g: G + Math.random() * 30,
      b: B + Math.random() * 30
    }
  }
  return area;
}