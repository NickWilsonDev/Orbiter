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

var fps = 5;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;

var radius = 2;
var count = 1;
var particleList = [];

var counter = function () {
    if (count === 11)
        count = 0;
    return ++count;
}

class Particle {
    constructor(xPos, yPos, mass, radius, velocity) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.mass = mass;
        this.radius = radius;
        this.velocity = velocity;
    }

}

var drawParticle = function (context, particle) {
    //console.log(colors[counter()]);
    //console.log(particle.xPos);
    //console.log(particle.yPos);
    //console.log(particle.radius);
    context.fillStyle = colors[counter()];
    context.beginPath();
    context.arc(particle.xPos, particle.yPos, particle.radius, 0, 
                                                        2 * Math.PI);
    context.stroke();
    context.fill();
};

var on_canvas_click = function(event) {
    //console.log(event.clientX);
    var particle = new Particle(event.clientX, event.clientY, 1, 2, 60);
    particleList.push(particle);
    drawParticle(context, particle);
};


canvas.addEventListener('click', on_canvas_click, false);

var animate = function () {
    requestAnimationFrame(animate);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        then = now - (delta % interval);
        // update positions of particles in list
        for (var i = 0; i < particleList.length; i++) {
            particleList[i].xPos += particleList[i].velocity / 60;
            particleList[i].yPos += particleList[i].velocity / 60;
        }
        context.clearRect(0, 0, 1000, 700);
        for (var i = 0; i < particleList.length; i++) {
            drawParticle(context, particleList[i]);
        }
    }
}

animate();

