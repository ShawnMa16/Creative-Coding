// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine

var engine;
var world;

// setting the ground for bouncing
let ground;
let wallLeft, wallRight;

let breaks;
let breakSize = 22.5;

let img;
let capture;
let myCanvas;

let groundCategory = 0x0002,
    breakCategory = 0x0004;

let sleeping = true;

function preload() {
    img = loadImage('http://104.131.113.151:3000/test.png');
}

function setup() {
    let options = {
        isStatic: true,
        collisionFilter: {
            category: groundCategory
        }
    }

    myCanvas = createCanvas(windowWidth, windowHeight);
    capture = createCapture(VIDEO);
    capture.size(320, 240);
    capture.hide();

    engine = Engine.create();
    world = engine.world;

    Engine.run(engine);

    ground = Bodies.rectangle(width / 2, height + 50, width, 100, options);
    wallLeft = Bodies.rectangle(0 - 50, height / 2, 100, height, options);
    wallRight = Bodies.rectangle(width + 50, height / 2, 100, height, options);
    World.add(world, [ground, wallLeft, wallRight]);

    breaks = Array.from({
        length: 8
    }, (v, y) => Array.from({
        length: 6
    }, (v, x) => new Break(capture, x * breakSize + breakSize / 2 + 90, y * breakSize + breakSize / 2, y * 6 + x)));

    console.log(breaks[0]);

    setTimeout(() => {
        sleeping = !sleeping;
    }, 5000);
}

function draw() {

    // image(img,0,0);
    background(255);
    breaks.forEach((line, i) =>
        line.forEach((
            _break, j) => {
            _break.render(capture);
        }));

}

function keyPressed() {
    if (keyCode == ENTER) {
        sleeping = !sleeping;
    }
}