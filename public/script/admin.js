
var canvas = document.getElementById("main-canvas");
canvas.width = window.innerWidth;
let header = document.getElementById("header").offsetHeight;
canvas.height = window.innerHeight - header;
//canvas.style.webkitFilter = "blur(5px)";
var ctx = canvas.getContext("2d");

/*
ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
ctx.fillRect(100, 100, 100, 100);

ctx.beginPath();
ctx.moveTo(50, 300);
ctx.lineTo(300, 100);
ctx.lineTo(400, 300);
ctx.strokeStyle = "#fa34a3";
ctx.stroke();

for (var i = 0; i < 3; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2, false);
    ctx.strokeStyle = "blue";
    ctx.stroke();
}

var x = Math.random() * window.innerWidth;
var y = Math.random() * window.innerHeight;
ctx.beginPath();
ctx.moveTo(x, y);
for (var i = 0; i < 100; i++) {
    x = Math.random() * window.innerWidth;
    y = Math.random() * window.innerHeight;
    ctx.lineTo(x, y);
}
ctx.strokeStyle = "#fa34a3";
ctx.stroke();
*/
const circleAmount = 1000;
const changeRadius = 75;
const maxRadius = 40;
const colorPallete = ["#5352c2", "#59598f", "#8d86f5", "#bed5fa", "#41c79d"];
//const colorPallete = ["#ff9900", "#818181", "#454545", "#313131", "#181818"];
const increaseSpeed = 4;
var colorPalleteLength = colorPallete.length;
var pos = 0;
var mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;
    init();
});

function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.originalRadius = radius;
    this.radius = radius;
    this.color = color;

    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.update = () => {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > innerHeight-100 || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;
        if (mouse.y>100){
            if (mouse.x - this.x < changeRadius && mouse.x - this.x > -changeRadius && mouse.y - this.y < changeRadius && mouse.y - this.y > -changeRadius) {
                if (this.radius < maxRadius) {
                    this.radius += increaseSpeed;
                }
            } else if (this.radius > this.originalRadius+1){
                this.radius -= increaseSpeed;
            }
        }

        this.draw();
    }
}
var circleArray = [];

function init() {
    circleArray = [];

    for (var i = 0; i < circleAmount; i++) {
        var radius = Math.random() * 30 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * ((innerHeight-100) - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        var color;
        if (pos == colorPalleteLength) {
            color = colorPallete[pos];
            pos=0;
        } else {
            color = colorPallete[pos];
            pos++;
        }
        circleArray.push(new Circle(x, y, dx, dy, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

init();
animate();