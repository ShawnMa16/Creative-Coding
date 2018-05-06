let polygonArray = [];
let numOfPolygon = 5;
let angle = Math.PI / 9.0;
let offSetX = 35;

let toMove = 18;

window.onload = function () {
    init();
};

function init() {
    for (let i = 0; i < numOfPolygon; i++) {
        polygonArray.push(new Polygon(window.innerWidth / 2 - i * 10,
            i * 10 * Math.tan(angle),
            i));
    }
    polygonArray.forEach((poly, i) => {
        poly.setAtts();
        poly.animations(i);
        poly.toDestination(i);
    });

    // animation for the whole group
    let groupToMove = SVG.get('groupToMove');
    // console.log(groupToMove);
    groupToMove.animate(500, '>').move(0, window.innerHeight * 0.45).animate(100,'>').dmove(0, -5);
    // polygonArray[6].toMove(6);
    // console.log(polygonArray[0]);
}