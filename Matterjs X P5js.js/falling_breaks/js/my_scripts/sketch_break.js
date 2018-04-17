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

let img;

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

    let myCanvas = createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    world = engine.world;

    Engine.run(engine);

    ground = Bodies.rectangle(320, height + 50, 400, 100, options);
    World.add(world, ground);

    breaks = Array.from({
        length: 16
    }, (v, y) => Array.from({
        length: 12
    }, (v, x) => new Break(img, x * 45 + 22.5, y * 45 + 22.5, y * 6 + x)));

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

function keyPressed(){
    if(keyCode == ENTER){
        sleeping = false;
    }
}