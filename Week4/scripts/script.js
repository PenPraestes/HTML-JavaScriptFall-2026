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

var shipSprite = {image: document.getElementById("ship"),x:1,y:1, moveX:0, moveY:0};

shipSprite.x = canvas.width/2;
shipSprite.y = canvas.height/2 + 100;

document.addEventListener("keydown", function(e){
    console.log(e.key);
    if(e.key == "a"){
        a = true;
    }
    if(e.key == "d"){
        d = true;
    }
    if(e.key == "w"){
        w = true;
    }
    if(e.key == "s"){
        s = true;
    }
});
document.addEventListener("keyup", function(e){
    console.log(e.key);
    if(e.key == "a"){
        a = false;
    }

    if(e.key == "d"){
        d = false;
    }

    if(e.key == "w"){
        w = false;
    }

    if(e.key == "s"){
        s = false;
    }

    //if ship goes off the screen, make it appear on the other side
    if(shipSprite.x > canvas.width){
        shipSprite.x = 0 + 25;
    }
    if(shipSprite.y > canvas.height){
        shipSprite.y = 0 + 25;
    }
    if(shipSprite.x < 0){
        shipSprite.x = canvas.width - 25;
    }
    if(shipSprite.y < 0){
        shipSprite.y = canvas.height - 25;
    }

});



//Game function
function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    startPoint.x += moveDirection.x;
    startPoint.y += moveDirection.y;

    ctx.fillStyle = boxColor;
    ctx.fillRect(startPoint.x, startPoint.y, 25, 25);
    ctx.drawImage(shipSprite.image, shipSprite.x, shipSprite.y, 25, 25);

    if(a == true){
        shipSprite.x -= 1;
    }
    if(d == true){
        shipSprite.x += 1;
    }
    if(w == true){
        shipSprite.y -= 1;
    }
    if(s == true){
        shipSprite.y += 1;
    }

    if(startPoint.y > canvas.height - 25 || startPoint.y < 0){
        moveDirection.y *= -1;
        boxColor = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
    }

        if(startPoint.x > canvas.width - 25 || startPoint.x < 0){
        moveDirection.x *= -1;
        boxColor = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
        }

    }