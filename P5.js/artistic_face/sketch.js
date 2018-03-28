let faces = [];

let left_eye_index = [6];
let left_eye

let right_eye_index = [6];
let right_eye;

let mouth_index = [12];
let mouth;

let nose_index = [9];
let nose;

function setup() {
  // put setup code here

  createCanvas(540, 720);
  rectMode(CENTER);

  left_eye = new Feature(createArea(6, 100, 49, 31, 50, 0.75));
  right_eye = new Feature(createArea(6, 100, 49, 31, 50, 0.75));
  mouth = new Feature(createArea(12, 150, 49, 50, 80, 0.6));
  nose = new Feature(createArea(9, 50, 49, 31, 30, 0.9));

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

    for (let i = 0; i < face.points.length; i++) {
      // pushing data for left eye
      if (35 < i && i < 42) {
        left_eye_index[i - 36] = face.points[i];
        // console.log(face.points[i]);
      }
      // pushing data for right eye
      if (41 < i && i < 48) {
        right_eye_index[i - 42] = face.points[i];
        // console.log(face.points[i]);
      }
      // pushing data for mouth
      if (47 < i && i < 60) {
        mouth_index[i - 48] = face.points[i];
      }

      // pushing data for nose
      if (26 < i && i < 36) {
        nose_index[i - 27] = face.points[i];
      }
    }

    // console.log(left_eye_index);
    left_eye.update(left_eye_index);
    left_eye.display();

    right_eye.update(right_eye_index);
    right_eye.display();

    mouth.update(mouth_index);
    mouth.display();

    nose.update(nose_index);
    nose.display();

  }
}

// function for creating areas for facial features
function createArea(number, R, G, B, size, ratio) {
  let area = [number];
  for (let i = 0; i < number; i++) {
    area[i] = {
      x: 0,
      y: 0,
      w: (Math.random() * 10 + size),
      h: (Math.random() * 3 + size) * ratio,
      a: (Math.random() * 50) + 50,
      r: R + Math.random() * 50,
      g: G + Math.random() * 30,
      b: B + Math.random() * 30
    }
  }
  return area;
}