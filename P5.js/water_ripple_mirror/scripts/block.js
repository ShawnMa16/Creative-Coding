class Block {
    constructor(x, y, id) {
        this.pos = createVector(x, y);
        this.id = id;
        this.viewable = true;
    }

    // that's where to render the blocks
    render(camA) {

        if (camA) {
            fill(camA);
            // console.log(camA);
        } else {
            fill(0);
        }
        this.d = dist(this.pos.x, this.pos.y, mouseX, mouseY);
        this.a = map(this.d, 0, 50, 255, 0);
        // fill(255, cubicInOut(this.amp, 60, 240, 15));
        // fill(0);

        //fill some specific blocks
        if (this.viewable) {
            if (this.id == 200) {
                if (this.d > 50) fill(0);
                else {
                    fill(254, 147, 140, this.a);
                    console.log(this.a);
                }
            }
        }
        // rect(this.pos.x + this.diff.x, this.pos.y + this.diff.y, (block_core + this.amp * block_scale) * 5, block_core + this.amp * block_scale * 0.5);
        rect(this.pos.x + this.diff.x, this.pos.y + this.diff.y, (block_core + this.amp * block_scale) * rectSize, (block_core + this.amp * block_scale) * rectSize);
    }

    checkViewed() {
        if (this.d < (block_core + this.amp * block_scale) * (rectSize - 5))
            this.viewable = false;
    }
    /**
     * @param {Ripple[]} ripples
     */
    calcDiff(ripples) {
        this.diff = createVector(0, 0);
        this.amp = 0;

        ripples.forEach((ripple, i) => {
            if (!ripple.dists[this.id]) {
                ripple.dists[this.id] = dist(this.pos.x, this.pos.y, ripple.pos.x, ripple.pos.y);
            };
            let distance = ripple.dists[this.id] - ripple.currRadius;
            if (distance < 0 && distance > -block_move_range * 2) {
                if (!ripple.angles[this.id]) {
                    ripple.angles[this.id] = p5.Vector.sub(this.pos, ripple.pos).heading();
                };
                const angle = ripple.angles[this.id];
                const localAmp = cubicInOut(-abs(block_move_range + distance) + block_move_range, 0, block_move_distance, block_move_range) * ripple.scale;
                this.amp += localAmp;
                const movement = p5.Vector.fromAngle(angle).mult(localAmp);
                this.diff.add(movement);
            }
        });
    }

}