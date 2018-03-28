let faces = [];

function setup() {
  // put setup code here

  createCanvas(540, 720);

}

function draw() {
  // put drawing code here
  background(255);
  for (var i = 0; i < faces.length; i++) {
    drawFace(faces[i]);
  }
}

function drawFace(face) {

  if (face.state === brfv4.BRFState.FACE_TRACKING_START || face.state === brfv4.BRFState.FACE_TRACKING) {
    face.points.forEach(function (point) {
      fill(0);
      ellipse(point.x, point.y, 5, 5);
      console.log(point);
    });

    // pushing data for left eye
    for (let i = 0; i < face.points.length; i++) {
      if (35 < i && i < 42) {
        left_eye_index[i - 36] = face.points[i];
        // console.log(face.points[i]);
      }
    }

    // console.log(left_eye_index);
    left_eye.update(left_eye_index);
    left_eye.display();
  }
}