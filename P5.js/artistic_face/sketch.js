let face = [];


function setup() {
  // put setup code here

  createCanvas(540, 720);

}

function draw() {
  // put drawing code here
}

function drawFace() {

  if (face.state === brfv4.BRFState.FACE_TRACKING_START || face.state === brfv4.BRFState.FACE_TRACKING) {
   face.points.forEach(function(point) {

    console.log(point);
   }
  );
  }
}