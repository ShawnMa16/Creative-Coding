class Break {
    constructor(imgSrc, _x, _y, _id) {
        let options = {
            friction: 0.1,
            restitution: 0.6,
            isSleeping: true,
            collisionFilter: {
                category: breakCategory,
                // mask: groundCategory
            }
        };
        // parameters for rectangle;
        this.id = _id;
        this.w = breakSize + random(10, 20);
        this.h = breakSize + random(10, 20);
        this.x = _x;
        this.y = _y;

        this.pixs = imgSrc.get(_x - this.w / 2, _y - this.h / 2, this.w, this.h);

        this.body = Bodies.rectangle(_x + (width-img.width)/2 + random(-5, 5), _y + random(-5, 5), this.w, this.h, options);
        World.add(world, this.body);
    }

    render() {
        this.body.isSleeping = sleeping;
        let angle = this.body.angle;
        let pos = this.body.position;
        // angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        fill(255);
        rotate(angle);
        // rectMode(CENTER);
        imageMode(CENTER);
        image(this.pixs, 0, 0);
        // rect(0, 0, this.w, this.h);
        pop();

        // if (camSrc) {
        //     let camPix = camSrc.get(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        //     imageMode(CENTER);
        //     image(camPix, this.x, this.y);
        // }
    }
}