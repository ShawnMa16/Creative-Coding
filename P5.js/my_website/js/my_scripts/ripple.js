class Ripple {
    constructor(x, y, scale) {
        this.pos = createVector(x, y);
        this.initTime = millis();
        this.currRadius = 0;
        this.endRadius = max(dist(this.pos.x, this.pos.y, 0, 0), dist(this.pos.x, this.pos.y, 0, height), dist(this.pos.x, this.pos.y, width, 0), dist(this.pos.x, this.pos.y, height, width)) + block_move_range;
        this.scale = scale;

        this.dists = [];
        this.angles = [];
    }

    checkKill() {
        if (this.currRadius > this.endRadius) {
            ripples.splice(ripples.indexOf(this), 1);
        }
    }

    updateRadius() {
        this.currRadius = (millis() - this.initTime) * ripple_speed;
        //this.currRadius = 200;
    }

    // draw() {
    //     stroke(255, cubicInOut(this.scale, 30, 120, 1));
    //     noFill();
    //     ellipse(this.pos.x, this.pos.y, this.currRadius * 2, this.currRadius * 2);
    // }
}