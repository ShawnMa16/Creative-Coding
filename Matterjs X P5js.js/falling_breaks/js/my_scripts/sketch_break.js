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

let breaks;
let breakSize = 45;

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
        // collisionFilter: 100
    }

    myCanvas = createCanvas(windowWidth, windowHeight);
    // capture = createCapture(VIDEO);
    // capture.size(640, 480);

    engine = Engine.create();
    world = engine.world;

    Engine.run(engine);

    ground = Bodies.rectangle(width/2, height + 50, 400, 100, options);
    World.add(world, ground);

    breaks = Array.from({
        length: 16
    }, (v, y) => Array.from({
        length: 12
    }, (v, x) => new Break(img, x * breakSize + breakSize/2, y * breakSize + breakSize/2, y * 12 + x)));

    console.log(breaks[0]);
}

function draw() {

    // image(img,0,0);
    background(255);
    breaks.forEach((line, i) =>
        line.forEach((
            _break, j) => {
            _break.render();
        }));
}

function keyPressed() {
    if (keyCode == ENTER) {
        sleeping = !sleeping;
    }
}