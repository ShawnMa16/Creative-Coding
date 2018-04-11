class Sign {

    constructor(x, y, id) {
        this.pos = createVector(x, y);
        this.id = id;
        this.clicked = false;
        this.letter = String.fromCharCode(0x30A0 + round(random(96)));
        this.speed = 2;
        this.charTiming = int(random(20, 40));
    }

    render(camA) {
        if (camA) {
            // fill the blocks with camera alpha data
            fill(0, camA, 0);
            // console.log(camA);
        } else {
            fill(0, 255, 0, 100);
        }
        textAlign(CENTER, CENTER);
        text(this.letter, this.pos.x, this.pos.y);
    }

    update() {
        // if (this.pos.y > height) {
        //     this.pos.y = 0;
        // }
        // this.pos.y += this.speed;
        if (frameCount % this.charTiming == 0) {
            this.letter = String.fromCharCode(0x30A0 + round(random(96)));;
        }
    }
}