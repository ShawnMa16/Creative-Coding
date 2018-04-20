class Line{
    // constructor for two bodies
    constructor(a, b) {
        this.posA = a.position;
        this.posB = b.position;
    }

    render(){
        stroke(255);
        strokeWeight(1);
        // draw a line between the two bodies
        line(this.posA.x, this.posA.y, this.posB.x, this.posB.y);
    }
}