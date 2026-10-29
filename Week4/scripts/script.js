//alert("Week 4 Lab")

/*
multiple line comment
*/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var fps = 1000/60;
var timer = setInterval(game, fps);

var startPoint = {x:canvas.width/2, y:canvas.height/2 };
var moveDirection = {x:1, y:1};

var boxColor = "red";


//Game function
function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    startPoint.x += moveDirection.x;
    startPoint.y += moveDirection.y;

    ctx.fillStyle = boxColor;
    ctx.fillRect(startPoint.x, startPoint.y, 25, 25);

    if(startPoint.y > canvas.height - 25 || startPoint.y < 0){
        moveDirection.y *= -1;
        boxColor = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
    }

        if(startPoint.x > canvas.width - 25 || startPoint.x < 0){
        moveDirection.x *= -1;
        boxColor = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
        }

}