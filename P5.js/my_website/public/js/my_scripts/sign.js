class Sign {

    constructor(x, y, id) {
        this.pos = createVector(x, y);
        this.id = id;
        this.clicked = false;
        this.letter = String.fromCharCode(0x30A0 + round(random(400)));
        this.charTiming = int(random(20, 40));
    }

    render(camA) {
        if (camA) {
            // fill the blocks with camera alpha data
            fill(camA);
            // console.log(camA);
        } else {
            fill(255);
        }
        textAlign(CENTER, CENTER);
        text(this.letter, this.pos.x, this.pos.y);
    }

    update() {
        if (frameCount % this.charTiming == 0) {
            this.letter = String.fromCharCode(0x30A0 + round(random(400)));;
        }
    }
}