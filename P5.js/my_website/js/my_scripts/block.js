class Block {
    constructor(x, y, id) {
        this.pos = createVector(x, y);
        this.id = id;
        this.clicked = false;
        this.url;
    }

    // that's where to render the blocks
    // passing the alpha data from camera for blocks to render
    render(camA) {

        if (camA) {
            // fill the blocks with camera alpha data
            fill(camA);
            // console.log(camA);
        } else {
            fill(0);
        }
        this.d_blockToMouse = dist(this.pos.x, this.pos.y, mouseX, mouseY);
        this.a = map(this.d_blockToMouse, 0, 50, 255, 0);
        this.size = (block_core + this.amp * block_scale) * (rectSize - 5);
        // fill(255, cubicInOut(this.amp, 60, 240, 15));
        // fill(0);

        checkRollOver(this.d_blockToMouse, this.size, this.id, this.pos);

        // rect(this.pos.x + this.diff.x, this.pos.y + this.diff.y, (block_core + this.amp * block_scale) * 5, block_core + this.amp * block_scale * 0.5);
        rect(this.pos.x + this.diff.x, this.pos.y + this.diff.y, (block_core + this.amp * block_scale) * rectSize, (block_core + this.amp * block_scale) * rectSize);
    }

    // ------------------------- Jump to different pages start -----------------------
    checkClicked() {
        if (this.d_blockToMouse < (block_core + this.amp * block_scale) * (rectSize - 5)) {
            // testing for the forest
            if (this.id == 200) {
                // cursor(HAND);
                this.clicked = true;
                console.log("200 was clicked!");
                setTimeout(function () {
                    window.open("https://xiaoma.space/about", "_self")
                }, 1200);
            }
        }
    }
    // ------------------------- Jump to different pages end -------------------------
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

// check if the blocks are rollover
function checkRollOver(d, size, block_id, block_pos) {

    // let grey = 150;

    if (block_id == 200) {
        if (d > size) {
            let grey = 150;
            cursor(ARROW);
            fill(grey);
            grey--;
        } else {
            cursor(HAND);
            push();
            textAlign(CENTER);
            textFont("Georgia");
            textSize(20);
            fill(255);
            text("about", block_pos.x, block_pos.y - size);
            pop();
            fill(255, this.a);
        }
    }
}