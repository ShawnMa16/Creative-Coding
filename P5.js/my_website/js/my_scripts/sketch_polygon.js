let polygonArray = [];
let numOfPolygon = 7;
let angle = Math.PI / 9.0;
let offSetX = 35;

let toMove = 18;

window.onload = function () {
    init();
};

function init() {
    for (let i = 0; i < numOfPolygon; i++) {
        polygonArray.push(new Polygon(405 - i * offSetX, 200 + i * offSetX * Math.tan(angle),
            "poly" + i, "text" + i));
    }
    polygonArray.forEach((poly, i) => {
        poly.setAtts();
        poly.animations(i);
    });
    // console.log(polygonArray[0]);
}