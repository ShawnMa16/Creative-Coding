import processing.video.*;
Capture cam;
int vScale = 25;

int R, G, B, A;

int ramX, ramY;
float ramW, ramH;

void setup() {
  size(640, 480);
  frameRate(120);
  cam = new Capture(this, width, height);
  cam.start();
}

void draw() {

  float move = random(-20, 20);
  image(cam, 0, 0, width, height);

  if (cam.available() == true) {
    cam.read();
    cam.loadPixels();
  }
  loadPixels();

  //for (int x = 0; x<cam.width; x++) {

  //  for (int y = 0; y<cam.height; y++) {

  //    int index = (cam.width+x-1+y*(cam.width))*4;

  //    int r = cam.pixels[index+0];
  //    int g = cam.pixels[index+1];
  //    int b = cam.pixels[index+2];
  //    float bright =(r+g+b)/3;
  //    float w = map(bright, 0, 255, 0, vScale);
  //    noStroke();
  //    fill(r, g, b, 20);
  //    rectMode(CENTER);
  //    rect(x*vScale, y*vScale, w+move, w+move);
  //  }
  //}

  for (int x = 0; x<width; x++) {
    for (int y = 0; y<height; y++) {

      ramX = int(random(width));
      ramY = int(random(height));

      ramW = random(4);
      ramH = random(3);
      PxPGetPixel(ramX, ramY, cam.pixels, width);                 // get the RGB of our pixel
      //R+=mouseX-width/2;                              // add the same amount to R,G,B to adjuast the brightness
      //G+=mouseX-width/2;
      //B+=mouseX-width/2;
      R= constrain(R, 0, 255);                          // make sure the values of R,G, are between 0-255
      G= constrain(G, 0, 255);
      B= constrain(B, 0, 255);

      //float bright =(R+G+B)/3;
      //float w = map(bright, 0, 255, 0, vScale);
      noStroke();
      fill(R, G, B,100);
      rectMode(CENTER);
      rect(ramX, ramY, ramW, ramY);

      //PxPSetPixel(x, y, R, G, B, 255, pixels, width);    // sets the R,G,B values to the window
    }
  }
  //updatePixels();
}


void PxPGetPixel(int x, int y, int[] pixelArray, int pixelsWidth) {
  int thisPixel=pixelArray[x+y*pixelsWidth];     // getting the colors as an int from the pixels[]
  A = (thisPixel >> 24) & 0xFF;                  // we need to shift and mask to get each component alone
  R = (thisPixel >> 16) & 0xFF;                  // this is faster than calling red(), green() , blue()
  G = (thisPixel >> 8) & 0xFF;   
  B = thisPixel & 0xFF;
}
