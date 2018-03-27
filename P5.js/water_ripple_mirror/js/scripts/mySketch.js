const block_size = 40;
const block_core = 1;
const block_move_distance = 5;
const block_move_range = 70;
const block_scale = 0.01;
const ripple_speed = 0.30;

let show_ripples = false;
let show_info = false;

let mouse_speed;
let fps, avgFps = 0;
let prevFrame = 0;
let prevTime = 0;
let fpsInterval = 1000;

let rectSize = 28;
// let rectSize = 22;

// setting the ids for clickable points
let idForPho;
let idForMot;

/**
 * @type {Block[][]}
 */
let blocks;

/**
 * @type {Ripple[]}
 */
let ripples = [];

let video;
/**
 * @type {cameraAlpha[][]}
 */
let cameraAlphas;
let camRows;
let camCols;

// datas for rectangles
let rectRows;
let rectCols;
// finding the middle numbers for col
let halfRect;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    fill(0);
    rectMode(CENTER);
    noSmooth();

    let left_padding = Math.round(width % block_size) / 2;
    let top_padding = Math.round(height % block_size) / 2;

    // pushing blocks into 2D arrays
    blocks = Array.from({
            length: Math.floor(height / block_size)
        }, (v, y) =>
        Array.from({
                length: Math.floor(width / block_size)
            }, (v, x) =>
            new Block(left_padding + block_size * (x + 0.5), top_padding + block_size * (y + 0.5), y * Math.floor(width / block_size) + x)
        )
    );

    console.log(blocks.length);

    // webcam settings
    camRows = blocks.length;
    camCols = int(camRows * (4 / 3));
    video = createCapture(VIDEO);
    video.size(camCols, camRows);
    video.hide();

    rectRows = camRows;
    rectCols = int(rectRows * 0.75);

    halfRect = int((camCols - rectCols) / 2);

    // pushing cameraAlphas into 2D arrays
    cameraAlphas = Array.from({
            length: rectRows
        }, (v, y) =>
        Array.from({
                length: rectCols
            }, (v, x) =>
            0
        )
    );

    console.log(cameraAlphas, rectRows, rectCols, camCols);

}

function draw() {

    video.loadPixels();

    // Begin loop for columns
    for (let i = halfRect; i < camCols - halfRect; i++) {
        // Begin loop for rows
        for (let j = 0; j < camRows; j++) {
            // Reversing x to mirror the image
            // In order to mirror the image, the column is reversed with the following formula:
            // mirrored column = width - column - 1
            var loc = ((camCols - i - 1) + j * camCols) * 4;

            // The functions red(), green(), and blue() pull out the three color components from a pixel.
            var r = video.pixels[loc];
            var g = video.pixels[loc + 1];
            var b = video.pixels[loc + 2];

            // A rectangle size is calculated as a function of the pixel's brightness. 
            // A bright pixel is a large rectangle, and a dark pixel is a small one.
            let A = map((r + g + b) / 3, 0, 255, 0, 100);
            cameraAlphas[j][i - halfRect] = A;
        }
    }
    // console.log(cameraAlphas);

    if (keyIsDown(32)) {
        if (random() < pow(fps / 60, 3)) {
            ripples.push(new Ripple(random(width), random(height), 0.4));
        }
    } else {
        if (random() < pow(fps / 60, 3) / 16) {
            ripples.push(new Ripple(random(width), random(height), 0.1));
        }
    }

    // console.log(mouse_speed);

    fps = frameRate();

    if (millis() - prevTime > fpsInterval) {
        avgFps = (frameCount - prevFrame) / fpsInterval * 1000;
        prevFrame = frameCount;
        prevTime = millis();
    }

    mouse_speed = dist(mouseX, mouseY, pmouseX, pmouseY);

    background(100, 20);

    rectMode(CENTER);

    ripples.forEach((ripple, i) => {
        ripple.updateRadius();
        ripple.checkKill();
    });

    noStroke();
    blocks.forEach((line, i) =>
        line.forEach((block, j) => {
            block.calcDiff(ripples);
            if (i < camRows) {
                block.render(cameraAlphas[i][j]);
            } else {
                block.render();
            }
        })
    );
}

function mouseMoved() {
    if (random() < pow(fps / 60, 3) * mouse_speed / 30) {
        ripples.push(new Ripple(mouseX, mouseY, 0.15 * mouse_speed / 50));
    }
}

function mouseDragged() {
    if (random() < pow(fps / 60, 3) * mouse_speed / 20) {
        ripples.push(new Ripple(mouseX, mouseY, 0.6 * mouse_speed / 40));
    }
}

function mousePressed() {
    ripples.push(new Ripple(mouseX, mouseY, 0.8));

    blocks.forEach((line, i) =>
        line.forEach((block, j) => {
            block.checkViewed();
        })
    );
}

function cubicInOut(t, b, c, d) {
    if (t <= 0) return b;
    else if (t >= d) return b + c;
    else {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 0.5;
        return c / 2 * (t * t * t + 2) + b;
    }
}