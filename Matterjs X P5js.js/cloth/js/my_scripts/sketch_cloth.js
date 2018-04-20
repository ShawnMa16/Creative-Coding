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

let groundCategory = 0x0002,
    breakCategory = 0x0004;

// let sleeping = true;

let constraint;
let mouseConstraint;

let windForce0, windForce1;
let windPos;

let clothBodies = [];
let lines = [];

function setup() {
    let options = {
        isStatic: true,
        collisionFilter: {
            category: groundCategory
        }
        // collisionFilter: 100
    }

    // windForce0 = {
    //     x: 0.000025,
    //     y: 0
    // };

    // windForce1 = {
    //     x: 0.002,
    //     y: -0.004
    // };

    windPos = {
        x: -100,
        y: 600
    }

    myCanvas = createCanvas(800, 800);
    frameRate(60);
    // capture = createCapture(VIDEO);
    // capture.size(640, 480);

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

    // ground = Bodies.rectangle(width / 2, height + 50, 400, 100, options);
    // World.add(world, ground);

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

    // console.log('hi');

    // image(img,0,0);

    // strokeWeight(2);
    // stroke(255);

    // if (sin(frameCount % 300) == 0) {
    //     engine.timing.timeScale = 0.5;
    //     let tempForce = 0.001;
    //     for (let i = 0; i < 100; i++) {
    //         let testForce = {
    //             x: tempForce *=1.001,
    //             y: -(tempForce *= 1.001)
    //         }
    //         // for (let i = 59; i < clothBodies.length; i++) {
    //         //     Body.applyForce(clothBodies[i], clothBodies[i].position, testForce);

    //         //     // clothBodies.forEach((body, i) => {
    //         //     //     Body.applyForce(body, windPos, windForce0);
    //         //     //     // Body.applyForce(body, windPos, windForce1);
    //         //     // });
    //         // }
    //         Body.applyForce(clothBodies[9][10], windPos, testForce);
    //         // clothBodies.forEach((line,i)=>{
    //         //     line.forEach((point,j) => {
    //         //         Body.applyForce(point, windPos, testForce);
    //         //     });
    //         // });
    //     }
    // }

    background(20, 20, 20);
    stroke(255);
    strokeWeight(2);
    line(180, 208, 620, 208);
    // fill(255);
    noFill();

    // clothBodies.forEach((line, i) => {
    //     line.forEach((body, j) => {
    //         let pos = body.position;
    //         let r = body.circleRadius;
    //         let angle = body.angle;
    //         push();
    //         // translate(pos.x, pos.x);
    //         // rectMode(CENTER);
    //         rotate(angle);
    //         // if (i < 19) {
    //         //     line(pos.x, pos.x, bodies[i + 1].position.x, bodies[i + 1].position.y);
    //         // }
    //         // point(pos.x, pos.y, 18, 18);
    //         point(pos.x, pos.y);
    //         // line(0, 0, r, 0);
    //         pop();
    //     });
    // });

    lines.forEach((line, i) => {
        line.render();
    });
    // for (let i = 0; i < cloth.bodies.length; i++) {
    //     // console.log(clothBodies[i]);
    //     let circle = cloth.bodies[i];
    //     let pos = circle.position;
    //     let r = circle.circleRadius;
    //     let angle = circle.angle;
    //     push();
    //     // translate(pos.x, pos.x);
    //     // rectMode(CENTER);
    //     rotate(angle);
    //     // if (i < 19) {
    //     //     line(pos.x, pos.x, bodies[i + 1].position.x, bodies[i + 1].position.y);
    //     // }
    //     // point(pos.x, pos.y, 18, 18);
    //     point(pos.x, pos.y);
    //     // line(0, 0, r, 0);
    //     pop();
    // }

    // let a = mouseConstraint.constraint.pointA;
    // let b = mouseConstraint.constraint.pointB;
    // // console.log(a);
    // let bodyB = mouseConstraint.constraint.bodyB;
    // // console.log(mouseConstraint.body.position);
    // if (bodyB) {
    //     // console.log(bodyB);
    //     stroke(255);
    //     // line(a.x, a.y, b.x + bodyB.position.x, b.y + bodyB.position.y);
    // }

}