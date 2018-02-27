/* main.js */



// grab context
var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");

var radius = 10;

var drawParticle = function (context, x, y) {
    //r = 0;
    //g = 0;
    //b = 0;
    //a = 1;
    //context.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
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
