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
        this.color = colors[counter()];
    }

}

var drawParticle = function (context, particle) {
    //console.log(colors[counter()]);
    //console.log(particle.xPos);
    //console.log(particle.yPos);
    //console.log(particle.radius);
    context.fillStyle = particle.color;
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

particlesToRemove = [];

var collision = function (partA, partB) {
    var distance = Math.pow(Math.pow(partA.xPos - partB.xPos, 2) 
                            + Math.pow(partA.yPos - partB.yPos, 2), 0.5);
    if (distance <= (partA.radius + partB.radius)) {
        if (partA.mass <= partB.mass) {
            particlesToRemove.push(partA);
            partB.mass += partA.mass;
            partB.radius += partA.radius;
        } else {
            particlesToRemove.push(partB);
            partA.mass += partB.mass;
            partA.radius += partB.radius;
        }
    }
    return;
}

var animate = function () {
    requestAnimationFrame(animate);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        then = now - (delta % interval);
        // check if any particles have collided
        // brute force may use quadtree later to speed up
        for (var i = 0; i < particleList.length; i++) {
            for (var j = i; j < particleList.length; j++) {
                if (particleList[i] != particleList[j]) {
                    collision(particleList[i], particleList[j]);
                }
            }
        }
        // remove absorbed particles
        //particleList = particleList.filter(item => 
        //        particlesToRemove.every(item2 => 
        //                                    item2.cid != item.$id));
        particleList = particleList.filter(function(element) {
            return particlesToRemove.indexOf(element) === -1;
        });
        particlesToRemove = [];
        //console.log(
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

