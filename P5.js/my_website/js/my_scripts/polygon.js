class Polygon {
    constructor(_x, _y, polyID, textID) {

        this.polyID = polyID;
        this.textID = textID;

        console.log(this.polyID);
        // getting DOM element
        this.nodeDOM = document.getElementById(polyID);
        this.textDOM = document.getElementById(textID);

        // getting SVG.js element
        this.polySVG = SVG.get(polyID);
        this.textSVG = SVG.get(textID);

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
        this.textDOM.setAttribute("y",this.pos[1]+this.setTextHeight);
    }

    animations(_id) {
        // let tempPolyID = "poly" + _id;
        // let 
        this.polySVG.click(function () {
            console.log("clicked");
            this.fill({
                color: 'grey'
            });
        });

        this.polySVG.on("mouseover", function () {
            document.getElementById("poly" + _id).style.cursor = "pointer";
            // this.animate(150).translate(0, -20);
            // SVG.get("text" + _id).animate(150).translate(0, -20);
            SVG.get("page" + _id).animate(150).translate(0, -20);
        });

        this.polySVG.on("mouseout", function () {
            // this.animate(10).translate(0, 0);
            // SVG.get("text" + _id).animate(10).translate(0, 0);
            SVG.get("page" + _id).animate(10).translate(0, 0);
        });

        // this.nodeDOM.addEventListener("mouseout", function (event) {
        //     event.target.setAttribute("transform", "translate(0,0)");
        // });
    }
}