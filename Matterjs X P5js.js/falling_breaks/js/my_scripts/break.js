class Break {
    constructor(imgSrc, _x, _y, _id) {
        this.options = {
            frictionAir: 0.1,
            friction: 0.5,
            restitution: 0,
            isSleeping: true,
            collisionFilter: {
                category: breakCategory,
                // mask: groundCategory
            },
            render: {
                visible: false
            }
        };
        // parameters for rectangle;
        this.id = _id;

        this.randomX = random(-5, 5);
        this.randomY = random(-5, 5);

        this.w = breakSize + random(15, 25);
        this.h = breakSize + random(15, 25);
        this.x = _x;
        this.y = _y;

        this.body = Bodies.rectangle(_x * 2.5 + this.randomX - 90 * 2.5 + (width - capture.width) / 2,
            _y * 2.5 + this.randomY + 200, this.w * 2, this.h * 2, this.options);

        World.add(world, [this.body]);

        this.angle;

        this.target = createVector(_x * 2.5 + this.randomX - 90 * 2.5 + (width - capture.width) / 2,
            _y * 2.5 + this.randomY + 200);

    }

    goToInitPos() {
        // this.body.force = createVector(0,0);
        // console.log(this.body.position);
        this.body.position = this.target;
        this.angle = this.body.angle;
    }

    removeBody() {
        World.remove(world, this.body);
    }

    renewBody() {
        console.log(this.body);
        // this.body = null;
        setTimeout(() => {
            let newbody = Bodies.rectangle(this.target.x, this.target.y, this.w * 2, this.h * 2, this.options);
            newbody.angle = this.angle;
            this.body = newbody;
            World.add(world, this.body);
        }, 500);
        // console.log(this.body);
    }
    render(camSrc) {
        // this.body.isStatic = staticy;
        this.body.isSleeping = sleeping;
        let angle = this.body.angle;
        let pos = this.body.position;

        let camPix = camSrc.get(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        camPix.resize(this.w * 2, this.h * 2);
        push();
        // scale(-1.0,1.0); 
        // console.log(camPix);
        translate(pos.x, pos.y);
        rotate(angle);
        // scale(-1.0,1.0);  
        imageMode(CENTER);
        image(camPix, 0, 0);
        pop();
    }
}