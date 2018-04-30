class Break {
    constructor(imgSrc, _x, _y, _id) {
        let options = {
            frictionAir: 0.0001,
            friction: 0.1,
            restitution: 0.6,
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
        // this.w = (breakSize + random(10, 20)) * 2;
        // this.h = (breakSize + random(10, 20)) * 2;

        this.w = breakSize + random(10, 20);
        this.h = breakSize + random(10, 20);
        this.x = _x;
        this.y = _y;

        this.initX = _x * 2.5 + random(-5, 5) - 90 * 2.5 + (width - capture.width) / 2;
        this.initY = _y * 2.5 + random(-5, 5);
        // this.pixs = imgSrc.get(_x - this.w / 2, _y - this.h / 2, this.w, this.h);

        // this.body = Bodies.rectangle(_x + (width - capture.width) / 2 + random(-5, 5), 
        // _y + random(-5, 5), this.w * 2, this.h * 2, options);

        this.body = Bodies.rectangle(_x * 2.5 + random(-5, 5) - 90 * 2.5 + (width - capture.width) / 2,
            _y * 2.5 + random(-5, 5), this.w * 2, this.h * 2, options);

        World.add(world, this.body);
    }

    render(camSrc) {
        this.body.isSleeping = sleeping;
        let angle = this.body.angle;
        let pos = this.body.position;
        // angle = this.body.angle;
        // push();
        // translate(pos.x, pos.y);
        // fill(255);
        // rotate(angle);
        // rectMode(CENTER);
        // imageMode(CENTER);
        // image(this.pixs, 0, 0);
        // // rect(0, 0, this.w, this.h);
        // pop();

        // if (camSrc) {
            // let camPix = camSrc.copy(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h, 0, 0, this.w, this.h);
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
        // }
    }
}