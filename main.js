/* main.js */

var colors = {
    1: 'red',
    2: 'blue',
    3: 'green',
    4: 'yellow',
    5: 'orange',
    6: 'darkviolet',
    7: 'grey',
    8: 'lightblue',
    9: 'skyblue',
    10: 'silver',
    11: 'aqua'
}

// grab context
var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");

var radius = 2;
var count = 1;

var counter = function () {
    if (count === 11)
        count = 0;
    return ++count;
}

class Particle {
    constructor(xPos, yPos, mass, radius) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.mass = mass;
        this.radius = radius;
    }

}

var drawParticle = function (context, x, y) {
    //console.log(colors[counter()]);
    context.fillStyle = colors[counter()];
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
}


var on_canvas_click = function(event) {
    //console.log(event.clientX);
    drawParticle(context, event.clientX, event.clientY);
};


canvas.addEventListener('click', on_canvas_click, false);
