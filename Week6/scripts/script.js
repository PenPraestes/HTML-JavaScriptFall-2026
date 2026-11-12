//alert("Welcome to the Lab");
/*
Allows you to comment multiple lines of code
Week 4 Lab - Experimenting with canvas animation
*/


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var fps = 1000 / 60;
var timer = setInterval(game, fps);

var startPoint = { x: canvas.width / 2, y: canvas.height / 2 };//canvas.width/2;
var moveDirection = { x: 1, y: 1 };

var boxColor = "red";
var shipSprite = { image: document.getElementById("ship"), x: 1, y: 1, moveX: 0, moveY: 0 };

var acceleration = 0.5;
var friction = 0.9;

// Objects dodged
var score = 0;

var states = ["title", "game"];
states = "title";

//Objects shot
var scoreShot = 0;

function createStar() {
    var star = {
        x: 0,
        y: 0,
        radius: 0,
        color: "black",
        drawCircle: function () {
            ctx.beginPath()
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
        },
    }
    return star;
}


var starCount = 50;
var stars = [];//Creates an array

for (var i = 0; i < starCount; i++) {
    stars[i] = createStar();
    stars[i].x = Math.random() * canvas.width;
    stars[i].y = Math.random() * canvas.height;
    stars[i].radius = Math.random() * 5;
    //stars[i].color = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
    stars[i].color = "white";

}

shipSprite.x = canvas.width / 2;
shipSprite.y = canvas.height / 2 + 100;

var a = false;
var d = false;
var w = false;
var s = false;
var space = false;
var enter = false;

//Add a variable for the bullets
var bullets = [];
var shootCooldown = 0;

var startCooldown = 10;

//Create a 3 second timer that starts when the box is shot 
var shotTimer = 0;



//on key pressed
document.addEventListener("keydown", function (e) {
    console.log(e.key);
    if (e.key == "a") {
        a = true;
    }
    if (e.key == "d") {
        d = true;
    }
    if (e.key == "w") {
        w = true;
    }
    if (e.key == "s") {
        s = true;
    }
    if (e.code === "Space") {
        space = true;
        e.preventDefault();
    }
    if (e.key === "Enter") {
        enter = true;
    }

}
)
;
//on key released
document.addEventListener("keyup", function (e) {
    console.log(e.key);
    if (e.key == "a") {
        a = false;
    }
    if (e.key == "d") {
        d = false;
    }
    if (e.key == "w") {
        w = false;
    }
    if (e.key == "s") {
        s = false;
    }
    if (e.code === "Space") {
        space = false;
    }
    if (e.key === "Enter") {
        enter = false;
    }
}

);

//event for button click
canvas.addEventListener("click", function (e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left * (canvas.width / rect.width);
    const mouseY = e.clientY - rect.top * (canvas.height / rect.height);

    if (states != "game" &&
        mouseX >= canvas.width / 2 - 100 &&
        mouseX <= canvas.width / 2 + 100 &&
        mouseY >= canvas.height / 2 + 100 &&
        mouseY <= canvas.height / 2 + 80
        ) {
        startCooldown = 10;
        switchScene("game");
    }
}
);

//This is our Game Loop Function
function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (states) {
        case "title":
            ctx.fillStyle = "black";
            ctx.font = "50px Arial";
            let titleText = "Star Shooter";
            ctx.fillText(titleText, canvas.width / 2 - ctx.measureText(titleText).width / 2, canvas.height / 2 -20);
            ctx.font = "18px Arial";
            let instructionText = "(Press Enter to Start)";
            ctx.fillText(instructionText, canvas.width / 2 - ctx.measureText(instructionText).width / 2, canvas.height / 2 +20);

            ctx.fillStyle = "red";
            ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 + 100, 200, 80);
            ctx.fillStyle = "black";
            ctx.font = "24px Arial";
            let buttonText = "Start Game";
            ctx.fillText(buttonText, canvas.width / 2 - ctx.measureText(buttonText).width / 2, canvas.height / 2 + 100 +50);
           
            //switch to game scene when enter is pressed
            if (enter) {
                startCooldown = 10;
             switchScene("game");
}

        break;

        case "game":
            if(startCooldown > 0){
                startCooldown-= 1;
            }
                
                //clear the screen
   
    startPoint.x += moveDirection.x;
    startPoint.y += moveDirection.y;

    var hitBox = shipSprite.x < startPoint.x + 25 &&
        shipSprite.x + 25 > startPoint.x &&
        shipSprite.y < startPoint.y + 25 &&
        shipSprite.y + 25 > startPoint.y;

    //Colliding with random box
    if (hitBox == true && startCooldown <= 0) {
        //The startpoint sprite hit the player
        shipSprite.x = canvas.width / 2
        shipSprite.y = canvas.height / 2 + 100;

        shipSprite.moveX = 0;
        shipSprite.moveY = 0;
        score = 0;
        
    }

    if (a == true) {
        //shipSprite.x -= 1
        shipSprite.moveX -= acceleration;
    }

    if (d == true) {
        //shipSprite.x += 1
        shipSprite.moveX += acceleration;
    }

    if (w == true) {
        //shipSprite.y -= 1
        shipSprite.moveY -= acceleration;
    }

    if (s == true) {
        //shipSprite.y += 1
        shipSprite.moveY += acceleration;
    }

    // if ship is off the right side of the screen make it come out the other side
    if (shipSprite.x > canvas.width) {
        shipSprite.x = -25;
    }

    if (shipSprite.x < -25) {
        shipSprite.x = 800;
    }

    if (startPoint.y > canvas.height - 25 || startPoint.y < 0) {
        //startPoint.y = -25;
        moveDirection.y *= -1;
        boxColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
    }

    if (startPoint.x > canvas.width - 25 || startPoint.x < 0) {
        //startPoint.y = -25;
        moveDirection.x *= -1;
        boxColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
    }

    //Multiply by friction
    shipSprite.moveX *= friction;
    shipSprite.moveY *= friction;

    //Update the X and Y position values
    shipSprite.x += shipSprite.moveX;
    shipSprite.y += shipSprite.moveY;

    //Bullet firing code
    if (shootCooldown > 0) {
        shootCooldown--;
    }

    if (space && shootCooldown === 0) {
        bullets.push({
            x: shipSprite.x + 25 / 2 - 2,
            y: shipSprite.y + -10,
            width: 4,
            height: 10,
            speed: 8,
            color: "white"
        });
        shootCooldown = 10;
    }

    //Draws Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //Draws Stars
    for (var i = 0; i < stars.length; i++) {
        //draw all the stars

        //Collide with Star
        if (shipToStarCollision(shipSprite, stars[i]) && startCooldown <= 0) {
            shipSprite.x = canvas.width / 2
            shipSprite.y = canvas.height / 2 + 100;

            shipSprite.moveX = 0;
            shipSprite.moveY = 0;
            score = 0;
            scoreShot = 0;
            startCooldown = 10;
            //return;
        }
        stars[i].drawCircle();
        stars[i].y++;
        if (stars[i].y > canvas.height + stars[i].radius * 2) {
            stars[i].x = Math.random() * canvas.width;
            stars[i].y = -(Math.random() * canvas.height);
            score += 10;
        }
    }

    //Respawn the box if it gets shot
    if (startPoint.x > 1000) {
        //increase the shot timer until it reaches 3 seconds (180 frames)
        if (shotTimer < 180) {
            shotTimer++;
        }
        //when the timer reaches 3 seconds, respawn the box with a random direction and reset the timer 
        if (shotTimer >= 180) {
            startPoint.x = canvas.width / 2;
            startPoint.y = canvas.height / 2;
            moveDirection.x = Math.random() * 4 - 2;
            moveDirection.y = Math.random() * 4 - 2;
            shotTimer = 0;
        }



    }

    //Play sound effect when shooting
    if (space && shootCooldown === 10) {
        var audio = new Audio("audio/laser.mp3");
        audio.play();
    }

    //Draw and check for bullet collsion
    for (var i = bullets.length - 1; i >= 0; i--) {
        var bullet = bullets[i];

        bullet.y -= bullet.speed;

        //Check for bullets that leave the screen
        if (bullet.y + bullet.height < 0) {
            bullets.splice(i, 1);
            continue;
        }

        var hitBox = bullet.x < startPoint.x + 25 &&
            bullet.x + bullet.width > startPoint.x &&
            bullet.y < startPoint.y + 25 &&
            bullet.y + bullet.height > startPoint.y;

        if (hitBox) {
            //remove bullet
            bullets.splice(i, 1);
            startPoint.x = 100000;
            moveDirection.x = 0;
            moveDirection.y = 0;
            scoreShot++;
            continue;
        }

        for (var j = 0; j < stars.length; j++) {
            if (shipToStarCollision(bullet, stars[j])) {
                bullets.splice(i, 1);
                stars[j].x = Math.random() * canvas.width;
                stars[j].y = -(Math.random() * canvas.height);
                continue;
            }
        }

        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
    //Draws Ship and box
    ctx.fillStyle = boxColor;
    ctx.fillRect(startPoint.x, startPoint.y, 25, 25);
    ctx.drawImage(shipSprite.image, shipSprite.x, shipSprite.y, 25, 25);


    //Draw our score hud element in the top left corner of the screen
    ctx.fillStyle = "White";
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${score}`, 30, 80);

    //Draw hud that tracks the amount of objects shot in the top right corner of the screen
    ctx.fillStyle = "White";
    ctx.font = "30px Arial";
    ctx.fillText(`Objects Shot: ${scoreShot}`, canvas.width - 240, 80);

            break;
    }



}

function shipToStarCollision(obj, star) {
    var closestX = Math.max(obj.x, Math.min(star.x, obj.x + 25));
    var closestY = Math.max(obj.y, Math.min(star.y, obj.y + 25));

    var dx = star.x - closestX;
    var dy = star.y - closestY;

    var dist = dx * dx + dy * dy;
    return dist <= star.radius * star.radius;
}

function switchScene(nameOfScene) {
    states = nameOfScene;
}

