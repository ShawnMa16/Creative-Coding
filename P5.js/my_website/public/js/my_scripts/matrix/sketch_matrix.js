const sign_size = 16;

/**
 * @type {Sign[][]}
 */
let signs;

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
// finding the middle number for col
let halfRect;

let streams = [];

function setup() {

    // rectMode(CENTER);

    matrix_canvas = createCanvas(windowWidth, windowHeight);
    background(0);

    let left_padding = Math.round(width % sign_size) / 2;
    let top_padding = Math.round(height % sign_size) / 2;

    // pushing blocks into 2D arrays
    signs = Array.from({
            length: Math.floor(height / sign_size)
        }, (v, y) =>
        Array.from({
                length: Math.floor(width / sign_size)
            }, (v, x) =>
            new Sign(left_padding + sign_size * (x + 0.5), top_padding + sign_size * (y + 0.5), y * Math.floor(width / sign_size) + x)
        )
    );

    camRows = signs.length;
    camCols = int(camRows * (4 / 3));
    video = createCapture(VIDEO);
    video.size(camCols, camRows);
    video.hide();

    rectRows = camRows;
    rectCols = int(rectRows * 0.75);

    // calculate the half pixles between the left blocks and the camera
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

    console.log(cameraAlphas[0].length, " ", rectCols);
    // console.log(signs);
    console.log(signs[0].length - rectCols);

    for (let i = 0; i < signs[0].length; i++) {
        streams.push(new Stream(signs[0][i].pos.x - sign_size * 0.5, signs[0][i].pos.y));
    }

}

function draw() {
    video.loadPixels();
    background(0);

    // Begin loop for columns
    // --------------------- pushing colors from camera into blocks start ---------------------
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
            let A = map((r + g + b) / 3, 0, 255, 0, 255);
            cameraAlphas[j][i - halfRect] = A;
        }
    }
    // --------------------- pushing colors from camera into blocks end ---------------------

    signs.forEach((line, i) =>
        line.forEach((matrix, j) => {
            // block.calcDiff(ripples);
            if (i < camRows) {
                matrix.render(cameraAlphas[i][j]);
            } else {
                matrix.render();
            }
            matrix.update();
        })
    );

    streams.forEach((stream, i) => {
        stream.update();
        stream.render();
    });
}