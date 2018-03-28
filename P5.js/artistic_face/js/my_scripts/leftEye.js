class leftEye {

    constructor() {
        this.points = [6];
        for (let i = 0; i < this.points.length; i++) {
            this.points[i] = {
                x: 0,
                y: 0,
                w: random(15, 20),
                h: w * random(0.5, 0.75)
            };
        }
    }

    update() {

    }
}