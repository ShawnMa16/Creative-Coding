class Polygon {
    constructor(_x, _y, _id) {

        // this.'poly' + this.id = 'poly' + this.id;
        // this.'text' + this.id = 'text' + this.id;

        this.id = _id;

        // console.log(this.'poly' + this.id);
        // getting DOM element
        this.nodeDOM = document.getElementById('poly' + this.id);
        this.textDOM = document.getElementById('text' + this.id);

        // getting SVG.js element
        this.polySVG = SVG.get('poly' + this.id);
        this.textSVG = SVG.get('text' + this.id);

        this.pos = [_x, _y];
        this.angle = Math.PI / 9.0;
        this.halfWidth = 50;
        this.halfHeight = 80;

        this.setTextHeight = 45;

        this.leftUp = [-this.halfWidth + this.pos[0], -this.halfHeight - this.halfWidth * Math.tan(this.angle) + this.pos[1]];
        this.rightUp = [this.halfWidth + this.pos[0], -this.halfHeight + this.halfWidth * Math.tan(this.angle) + this.pos[1]];
        this.rightDown = [this.halfWidth + this.pos[0], this.halfHeight + this.halfWidth * Math.tan(this.angle) + this.pos[1]];
        this.leftDown = [-this.halfWidth + this.pos[0], this.halfHeight - this.halfWidth * Math.tan(this.angle) + this.pos[1]];
        this.points = [this.leftUp[0], this.leftUp[1], this.rightUp[0], this.rightUp[1], this.rightDown[0], this.rightDown[1], this.leftDown[0], this.leftDown[1]]

    }

    setAtts() {
        // setting the attributes for polygon, including points, fill color, stroke color and weight
        this.nodeDOM.setAttribute("points", this.points);
        this.nodeDOM.setAttribute("fill", "rgb(20,20,20)");
        this.nodeDOM.setAttribute("stroke", "white");
        this.nodeDOM.setAttribute("stroke-width", "4");

        this.textDOM.setAttribute("x", this.pos[0]);
        this.textDOM.setAttribute("y", this.pos[1]);
    }

    animations(_id) {
        // let temp'poly' + this.id = "poly" + _id;
        // let 
        this.polySVG.click(function () {
            // console.log("clicked");
            this.fill({
                color: 'grey'
            });
        });

        this.polySVG.on("mouseover", function () {
            document.getElementById("poly" + _id).style.cursor = "pointer";
            // this.animate(150).translate(0, -20);
            // SVG.get("text" + _id).animate(150).translate(0, -20);
            SVG.get("page" + _id).animate(150, '>').dmove(0, -20);
        });

        this.polySVG.on("mouseout", function () {
            // this.animate(10).translate(0, 0);
            // SVG.get("text" + _id).animate(10).translate(0, 0);
            SVG.get("page" + _id).animate(10, '>').dmove(0, 20);
        });

        // this.nodeDOM.addEventListener("mouseout", function (event) {
        //     event.target.setAttribute("transform", "translate(0,0)");
        // });
    }

    toDestination(_id) {
        let direction = 3 - _id;
        SVG.get("page" + _id).animate(500, '>', 800).dmove(direction * 25, -direction * 25 * Math.tan(angle));
    }
}