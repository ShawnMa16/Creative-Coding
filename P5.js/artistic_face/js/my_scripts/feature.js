class Feature {
    constructor(area) {
        this.points = [];
        for (let i = 0; i < area.length; i++) {
            this.points.push(area[i]);
        }
        // console.log(this.points);
    }

    update(faceFeature) {
        // console.log(faceLeftEye);
        for (let i = 0; i < faceFeature.length; i++) {
            this.points[i].x = faceFeature[i].x;
            this.points[i].y = faceFeature[i].y;
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