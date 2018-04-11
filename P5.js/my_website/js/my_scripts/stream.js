class Stream {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.speed = floor(random(1, 3)) * sign_size;
        this.length = floor(random(10, 50)) * sign_size;
        this.toMove = -this.length;
        // this.init = this.toMove;
    }

    render() {
        fill(0);
        rect(this.pos.x, -sign_size, sign_size, this.toMove);
        rect(this.pos.x, sign_size + this.toMove + this.length, sign_size, height);
        // console.log(height - (this.length + this.toMove));
    }

    update() {
        if (this.toMove >= height) {
            this.toMove = -this.length;
        }
        this.toMove += this.speed;
        // console.log(this.toMove);
    }
}