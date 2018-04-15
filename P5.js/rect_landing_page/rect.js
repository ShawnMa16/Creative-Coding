class Rectangle {
    constructor(_x, _y, _id) {
        // center of the rectangle
        this.pos = createVector(_x, _y);
        this.initY = this.pos.y;
        this.id = _id;
        this.angle = PI / 9.0;
        this.halfWidth = 50;
        this.halfHeight = 80;
    }

    render() {
        push();
        fill(30);
        beginShape();
        stroke(255, 251, 249);
        strokeWeight(4);
        // rect(this.pos.x, this.pos.y, 100, 200);
        // console.log(Math.tan(this.angle));
        
        // leftUp, rightUp, rightDown, rightUp;
        vertex(-this.halfWidth + this.pos.x, -this.halfHeight - this.halfWidth * tan(this.angle) + this.pos.y);
        vertex(this.halfWidth + this.pos.x, -this.halfHeight + this.halfWidth * tan(this.angle) + this.pos.y);
        vertex(this.halfWidth + this.pos.x, this.halfHeight + this.halfWidth * tan(this.angle) + this.pos.y);
        vertex(-this.halfWidth + this.pos.x, this.halfHeight - this.halfWidth * tan(this.angle) + this.pos.y);
        endShape(CLOSE);
        pop();
    }

    update() {

    }
}

function checkRollOver(d, size, block_id, block_pos) {

}