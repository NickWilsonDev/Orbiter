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
var GRAVITATION_CONSTANT = 5.0;
var SQRTTWO = Math.pow(2, 0.5);
var numParticles = 0;

var counter = function () {
    if (count === 11)
        count = 0;
    return ++count;
}

var particleCountDisplay = document.getElementById("numParticles");

var clearParticles = function () {
    particleList = [];
    numParticles = 0;
    particleCountDisplay.innerHTML = numParticles;
}


class Particle {
    constructor(xPos, yPos, mass, radius, velocity) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.mass = mass;
        this.radius = radius;
        this.xVelocity = velocity;
        this.yVelocity = velocity;
        this.color = colors[counter()];
        numParticles++;
        particleCountDisplay.innerHTML = numParticles;
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
    var particle = new Particle(event.clientX, event.clientY, 5, 2, 0);
    particleList.push(particle);
    drawParticle(context, particle);
};


canvas.addEventListener('click', on_canvas_click, false);

particlesToRemove = [];

var calcDistance = function(partA, partB) {
    return Math.pow(
                    Math.pow(partA.xPos - partB.xPos, 2)
                    + Math.pow(partA.yPos - partB.yPos, 2), 0.5);
};

var collision = function (partA, partB) {
    var distance = calcDistance(partA, partB);
    if (distance <= (partA.radius + partB.radius)) {
        numParticles--;
        particleCountDisplay.innerHTML = numParticles;
        if (partA.mass <= partB.mass) {
            particlesToRemove.push(partA);
            partB.mass += partA.mass;
            partB.radius += partA.radius / 2; // / (partB.mass * 5.0);
            partB.xVelocity += partA.xVelocity / partB.mass;
            partB.yVelocity += partA.yVelocity / partB.mass;
        } else {
            particlesToRemove.push(partB);
            partA.mass += partB.mass;
            partA.radius += partB.radius / 2; // / (partA.mass * 5.0);
            partA.xVelocity += partB.xVelocity / partA.mass;
            partA.yVelocity += partB.yVelocity / partA.mass;
        }
    }
    return;
};

var forceX = 0.0;
var forceY = 0.0;

var calcVelocity = function (partA, partB) {
    distance = calcDistance(partA, partB);
    // maybe have them collide
    if (distance <= 0.0) {
        return;
    }
    var xDistance = partA.xPos - partB.yPos;
    var yDistance = partA.yPos - partB.yPos;

    var force = GRAVITATION_CONSTANT * partA.mass * partB.mass;
    force = force / (distance * distance);
    forceX -= Math.abs(force * (xDistance / distance)) * Math.sign(xDistance);
    forceY -= Math.abs(force * (yDistance / distance)) * Math.sign(yDistance);
};

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
                    console.log(particleList[0].xVelocity);
                }
            }
        }
        // remove absorbed particles
        particleList = particleList.filter(function(element) {
            return particlesToRemove.indexOf(element) === -1;
        });
        particlesToRemove = [];
        //console.log(
        // update velocities
        
        for (var i = 0; i < particleList.length; i++) {
            forceX = 0.0;
            forceY = 0.0;
            for (var j = 0; j < particleList.length; j++) {
                calcVelocity(particleList[i], particleList[j]);
            }
            particleList[i].xVelocity += forceX / particleList[i].mass;
            particleList[i].yVelocity += forceY / particleList[i].mass;
        }
        // update positions of particles in list
        for (var i = 0; i < particleList.length; i++) {
            particleList[i].xPos += particleList[i].xVelocity; /// 60;
            particleList[i].yPos += particleList[i].yVelocity; /// 60;
        }
        context.clearRect(0, 0, 1000, 700);
        for (var i = 0; i < particleList.length; i++) {
            drawParticle(context, particleList[i]);
        }
    }
}

animate();

