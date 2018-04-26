let stringForElements = [5];
// let parents = [5];
let parallaxs = [5];

let SVGElements = [5];

stringForElements[0] = 'forest';
stringForElements[1] = 'cloth';
stringForElements[2] = 'ripple';
stringForElements[3] = 'matrix';
stringForElements[4] = 'face';

$(document).ready(function () {
    for (let i = 0; i < 5; i++) {
        SVGElements[i] = SVG.get(stringForElements[i]);
        console.log(SVGElements[i]);

        parallaxs.push(new Parallax(document.getElementById(stringForElements[i] + 'P'), {
            relativeInput: true,
            invertX: true,
            invertY: true,
            limitX: 10,
            limitY: 10,
        }));
        // document.getElementById(stringForElements[i]).style.cursor = "pointer";

        SVGElements[i].on('mouseover', function () {
            console.log("mouse is on ");
            // this.node.children[1].animate().size(200, 200);
            SVG.get("forest").move(200, 200);
        });

        SVGElements[i].click( function () {
            this.fill("grey");
        });
    }

});