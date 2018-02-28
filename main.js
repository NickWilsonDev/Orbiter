/* main.js */

var colors = {
    1: 'Red',
    2: 'Blue',
    3: 'Green',
    4: 'Yellow',
    5: 'Orange',
    6: 'DarkViolet',
    7: 'Grey',
    8: 'LightBlue',
    9: 'SkyBlue',
    10: 'Silver'
}

// grab context
var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");

var radius = 5;

var drawParticle = function (context, x, y) {
    context.fillStyle = 'blue';
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
}


var on_canvas_click = function(event) {
    console.log(event.clientX);
    drawParticle(context, event.clientX, event.clientY);
};


canvas.addEventListener('click', on_canvas_click, false);
