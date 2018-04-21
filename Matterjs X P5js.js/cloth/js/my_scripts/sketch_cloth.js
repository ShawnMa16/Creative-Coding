// module aliases
let Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;
// create an engine

let engine;
let world;

// setting the ground for bouncing
let cloth;
let ground;
let tempBodies = [];

let myCanvas;

let constraint;
let mouseConstraint;

let windForce0, windForce1;
let windPos;

let clothBodies = [];
let lines = [];

// setting the wind force
let from;
let force;
let micInput;
// count fot the first line
let count;

function setup() {

    from = {
        x: 0,
        y: 400
    };
    count = 0;
    micInput = false;

    myCanvas = createCanvas(800, 800);
    frameRate(60);

    engine = Engine.create();
    world = engine.world;

    // setting the mouse control for the render;
    let myMouse = Mouse.create(myCanvas.elt);
    console.log(myCanvas.elt);
    let mouseParams = {
        mouse: myMouse,
        constraint: {
            stiffness: 0.1,
        }
    }
    mouseConstraint = MouseConstraint.create(engine, mouseParams);
    mouseConstraint.mouse.pixelRatio = pixelDensity();
    World.add(world, mouseConstraint);
    console.log(mouseConstraint);

    //-------------------------------- attrubutes for the cloth begin -------------------------------- 
    let group = Body.nextGroup(true);
    let particleOptions = {
        friction: 0.00001,
        frictionAir: 0.02,
        collisionFilter: {
            group: group
        },
        render: {
            visible: false
        }
    };
    let constraintOptions = {
        stiffness: 0.06
    };

    cloth = Composites.softBody(200, 200, 20, 12, 5, 5, false, 8, particleOptions, constraintOptions);

    for (let i = 0; i < 20; i++) {
        cloth.bodies[i].isStatic = true;
    }

    World.add(world, cloth);

    // pushing the cloth bodies into a temporary array for splicing
    for (let i = 0; i < cloth.bodies.length; i++) {
        tempBodies.push(cloth.bodies[i]);
    }
    console.log(tempBodies.length);
    //-------------------------------- attrubutes for the cloth end -------------------------------- 

    Engine.run(engine);

    // conver the 1D array into 2d
    while (tempBodies.length) {
        clothBodies.push(tempBodies.splice(0, 20));
    }
    // console.log(clothBodies);

    // pushing the cloth bodies into line class to form the linse
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 20; j++) {
            let a = clothBodies[i][j];
            if (i != 12 - 1) {
                let b1 = clothBodies[i + 1][j];
                let s1 = new Line(a, b1);
                lines.push(s1);
                // physics.addSpring(s1);
            }
            if (j != 20 - 1) {
                let b2 = clothBodies[i][j + 1];
                let s2 = new Line(a, b2);
                lines.push(s2);
                // physics.addSpring(s2);
            }
        }
    }

    console.log(clothBodies);
}

function draw() {
    // (Matter.Common.random(-2e-4, 0))
    if (!micInput) {
        force = createVector((Matter.Common.random(0, 2e-4)), 0);
    } else {
        force.mult(0.99);
    }
    // force = createVector(-random((Matter.Common.random(-2e-4, 0)) / 4, (Matter.Common.random(-2e-4, 0))), 0);
    setTimeout(() => {
        applyWindForce(from, force);
    }, 3000);

    // setTimeout(() => {
    //     blowAway(count);
    //     // if(count == 20) clearTimeout(blowAway(_id));
    // }, 10000);

    // setTimeout(() => {
    //     clothBodies[0][1].isStatic = false;
    // }, 16000);

    background(20, 20, 20);
    stroke(255);
    strokeWeight(2);
    line(180, 208, 620, 208);
    // fill(255);
    noFill();

    lines.forEach((line, i) => {
        line.render();
    });
}

// blow way the cloth node by node
blowAway = (_id) => {
    clothBodies[0][_id].isStatic = false;
    _id++;
    console.log(_id);

    setTimeout(() => {
        blowAway(_id)
    }, _id * 1000 + 1000);

    // if(_id == 20) clearTimeout(blowAway(_id));
};

applyWindForce = (_location, _wind) => {
    clothBodies.forEach((line, i) => {
        line.forEach((point, j) => {
            Body.applyForce(point, _location, _wind);
        });
    });
};

function keyPressed() {
    if (keyCode === ENTER) {
        micInput = !micInput;
        mic = new p5.AudioIn();
        // start the Audio Input.
        // By default, it does not .connect() (to the computer speakers)
        mic.start();
    }
}