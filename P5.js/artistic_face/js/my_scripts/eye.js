class Eye {
    constructor(area) {
        this.points = [];
        // let area = [6];
        // for (let i = 0; i < 6; i++) {
        //     area[i] = {
        //         x: 0,
        //         y: 0,
        //         w: (Math.random() * 10 + 50),
        //         h: (Math.random() * 3 + 50) * 0.75,
        //         a: (Math.random() * 50) + 50,
        //         r: 100 + Math.random() * 50,
        //         g: 49 + Math.random() * 30,
        //         b: 31 + Math.random() * 30
        //     }
        // }
        for (let i = 0; i < 6; i++) {
            this.points.push(area[i]);
        }
        // console.log(this.points);
    }

    update(faceEye) {
        // console.log(faceLeftEye);
        for (let i = 0; i < faceEye.length; i++) {
            this.points[i].x = faceEye[i].x;
            this.points[i].y = faceEye[i].y;
        }
        // console.log(this.points);
    }

    display() {
        for (let i = 0; i < this.points.length; i++) {
            fill(this.points[i].r, this.points[i].g, this.points[i].b, this.points[i].a);
            strokeWeight(0.5);
            rect(this.points[i].x, this.points[i].y, this.points[i].w, this.points[i].h);
        }
    }
}