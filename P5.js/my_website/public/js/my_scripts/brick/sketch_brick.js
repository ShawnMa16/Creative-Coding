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
let ceiling;

let bricks;
let brickSize = 22.5;

let img;
let capture;
let myCanvas;

let groundCategory = 0x0002,
    brickCategory = 0x0004;

let sleeping = true;
let staticy = true;

let bodyRebuild;
let trigger;

let count = 0;

rebuildBody = () => {
    console.log("bodies rebuilt!");
    sleeping = true;
    bricks.forEach((line, i) =>
        line.forEach((
            _brick, j) => {
            _brick.goToInitPos();
            _brick.removeBody();
            _brick.renewBody();
        }));
};

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

    ground = Bodies.rectangle(width / 2, height + 100, width, 200, options);
    wallLeft = Bodies.rectangle(0 - 100, height / 2, 200, height, options);
    wallRight = Bodies.rectangle(width + 100, height / 2, 200, height, options);
    ceiling = Bodies.rectangle(width / 2, 0 - 100, width, 200, options);
    World.add(world, [ground, wallLeft, wallRight, ceiling]);

    bricks = Array.from({
        length: 8
    }, (v, y) => Array.from({
        length: 6
    }, (v, x) => new Brick(capture, x * brickSize + brickSize / 2 + 90, y * brickSize + brickSize / 2, y * 6 + x)));

    console.log(bricks[0]);

    setTimeout(() => {
        sleeping = !sleeping;
    }, 5000);
    
    trigger = setInterval(function () {
        sleeping = false;
        count++;
    }, 24000);

    bodyRebuild = setInterval(function () {
        console.log("bodies rebuilt!");
        sleeping = true;
        bricks.forEach((line, i) =>
            line.forEach((
                _brick, j) => {
                _brick.goToInitPos();
                _brick.removeBody();
                _brick.renewBody();
            }));
    }, 20000);

    // console.log(bricks[0][0].target);
}

function draw() {

    if(count == 2){
        console.log("stop!");
        clearInterval(trigger);
        // clearInterval(bodyRebuild);
    }

    // image(img,0,0);
    background(255, 250, 249);
    bricks.forEach((line, i) =>
        line.forEach((
            _brick, j) => {
            _brick.render(capture);
        }));
}

function keyPressed() {
    if (keyCode == ENTER) {
        sleeping = !sleeping;
        staticy = !staticy;
    }
}