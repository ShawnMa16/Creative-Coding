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

    // pushing cameraAlphas into 2D arrays
    cameraAlphas = Array.from({
            length: blocks.length
        }, (v, y) =>
        Array.from({
                length: 15
            }, (v, x) =>
            0
        )
    );

    console.log(blocks.length);

    // webcam settings
    cols = 27;
    rows = blocks.length;
    video = createCapture(VIDEO);
    video.size(cols, rows);
    video.hide();
}

function draw() {

    video.loadPixels();

    // Begin loop for columns
    for (let i = 6; i < cols - 6; i++) {
        // Begin loop for rows
        for (let j = 0; j < rows; j++) {
            // Reversing x to mirror the image
            // In order to mirror the image, the column is reversed with the following formula:
            // mirrored column = width - column - 1
            var loc = ((cols - i - 1) + j * cols) * 4;

            // The functions red(), green(), and blue() pull out the three color components from a pixel.
            var r = video.pixels[loc];
            var g = video.pixels[loc + 1];
            var b = video.pixels[loc + 2];

            // A rectangle size is calculated as a function of the pixel's brightness. 
            // A bright pixel is a large rectangle, and a dark pixel is a small one.
            let A = map((r + g + b) / 3, 0, 255, 0, 100);
            cameraAlphas[j][i - 6] = A;
        }
    }
    console.log(cameraAlphas);

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
            if (i < rows) {
                block.render(cameraAlphas[i][j]);
            } else {
                block.render();
            }
            // block.render();
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

class Block {
    constructor(x, y, id) {
        this.pos = createVector(x, y);
        this.id = id;
        this.viewable = true;
    }

    // that's where to render the blocks
    render(camA) {

        if (camA) {
            fill(camA);
            console.log(camA);
        } else {
            fill(0);
        }
        this.d = dist(this.pos.x, this.pos.y, mouseX, mouseY);
        this.a = map(this.d, 0, 50, 255, 0);
        // fill(255, cubicInOut(this.amp, 60, 240, 15));
        // fill(0);

        //fill some specific blocks
        if (this.viewable) {
            if (this.id == 200) {
                if (this.d > 50) fill(0);
                else {
                    fill(254, 147, 140, this.a);
                    console.log(this.a);
                }
            }
        }
        // rect(this.pos.x + this.diff.x, this.pos.y + this.diff.y, (block_core + this.amp * block_scale) * 5, block_core + this.amp * block_scale * 0.5);
        rect(this.pos.x + this.diff.x, this.pos.y + this.diff.y, (block_core + this.amp * block_scale) * rectSize, (block_core + this.amp * block_scale) * rectSize);
    }

    checkViewed() {
        if (this.d < (block_core + this.amp * block_scale) * (rectSize - 5))
            this.viewable = false;
    }
    /**
     * @param {Ripple[]} ripples
     */
    calcDiff(ripples) {
        this.diff = createVector(0, 0);
        this.amp = 0;

        ripples.forEach((ripple, i) => {
            if (!ripple.dists[this.id]) {
                ripple.dists[this.id] = dist(this.pos.x, this.pos.y, ripple.pos.x, ripple.pos.y);
            };
            let distance = ripple.dists[this.id] - ripple.currRadius;
            if (distance < 0 && distance > -block_move_range * 2) {
                if (!ripple.angles[this.id]) {
                    ripple.angles[this.id] = p5.Vector.sub(this.pos, ripple.pos).heading();
                };
                const angle = ripple.angles[this.id];
                const localAmp = cubicInOut(-abs(block_move_range + distance) + block_move_range, 0, block_move_distance, block_move_range) * ripple.scale;
                this.amp += localAmp;
                const movement = p5.Vector.fromAngle(angle).mult(localAmp);
                this.diff.add(movement);
            }
        });
    }

}

class Ripple {
    constructor(x, y, scale) {
        this.pos = createVector(x, y);
        this.initTime = millis();
        this.currRadius = 0;
        this.endRadius = max(dist(this.pos.x, this.pos.y, 0, 0), dist(this.pos.x, this.pos.y, 0, height), dist(this.pos.x, this.pos.y, width, 0), dist(this.pos.x, this.pos.y, height, width)) + block_move_range;
        this.scale = scale;

        this.dists = [];
        this.angles = [];
    }

    checkKill() {
        if (this.currRadius > this.endRadius) {
            ripples.splice(ripples.indexOf(this), 1);
        }
    }

    updateRadius() {
        this.currRadius = (millis() - this.initTime) * ripple_speed;
        //this.currRadius = 200;
    }

    // draw() {
    //     stroke(255, cubicInOut(this.scale, 30, 120, 1));
    //     noFill();
    //     ellipse(this.pos.x, this.pos.y, this.currRadius * 2, this.currRadius * 2);
    // }
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