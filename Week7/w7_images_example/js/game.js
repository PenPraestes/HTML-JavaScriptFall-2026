/*-------------------------------------------
Game Setup
 1. canvas 
 2. context
 3. frame rate
 4. animation timer runs main function 60 frames per second
-------------------------------------------*/
var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var fps = 1000/60
var timer = setInterval(main, fps)
/*--------------main()------------------------
This is the function that makes the game work 
You DO NOT need to edit this
---------------------------------------------*/
function main()
{
    //erases the screen
    ctx.clearRect(0,0,c.width,c.height); 
    //executes game screens
    state()   
}

/*----vvvv Only Edit Below Here vvvv-----*/

/*------------Declare Variables Here--------*/
var state;
var button = new GameObject()
button.color = `cyan`
button.h = 50
//Declare an Object and pass in the id of the image you want to display
var mrt = new GameObject(`#default`)
var menuBG = new GameObject(`#menu-bg`)

/*-------------Set values in the initialize function---*/
//The object's img property is an object that contains the details about your image including the scale. The scale is a percentage, while the w and h are pixel values. The image uses it's native size, so it's best to make your images the correct size to begin with.
function init()
{
    state = menu
    mrt.img.scale.x = .5
    mrt.img.scale.y = .5
    button.x = c.width/2
}
/*----Do NOT delete-----*/
init();

/*---------------Game Screens (states)----------------*/
function menu()
{
    //put the button on the screen
    button.x = c.width/2
    //If the button object is clicked start the game
    if(clicked(button))
    {
        state = game
        //move the button so it's no longer clickable.
        
        button.x = 10000
    }

    menuBG.graphic();
    
    //draws a shape for a button
    button.render()
    //draws the text on the button
    ctx.save()
        ctx.textAlign=`center`
        ctx.fillStyle = `#000000`
        ctx.font = `bold 20px Arial`
        ctx.fillText(`START`, button.x, button.y+6)
    ctx.restore()

}

function game()
{
    //Any changes to numbers go here
    //Any collision detection goes here
    //draw the pictures
    if(s==true)
    {
        state = menu;
        init()
    }
    //draws the image 
    mrt.graphic()

    mrt.angle +=4;
    mrt.x += 3;

    if(mrt.x > c.height + mrt.h / 2){
        mrt.img.sh
        mrt.y = 0 - mrt.h
    }
}


/*------Helpful functions--------*/

//random number generator
function rand(_low, _high)
{
    return Math.random()*(_high - _low) + _low;
}
//Converts degrees to radians
function radians(_deg)
{
    return _deg * Math.PI/180
}

//Converts radians to degrees
function degrees(_rad)
{
    return _rad * 180/Math.PI
}
/*-------Diagram--------

               /|        c = the hypoteneuse
            c / |        b = height
             /  | b      a = width
            /   |        T = arch tangent angle
           /T___|
             a

--------------------------

To get a and b (displacement) when you know two points
  
    a = destination.x - starting.x
    b = destination.y - starting.y

To get the total distance (hypotenuese) between two points
    c = Math.sqrt(_a*_a + _b*_b)

To get the arc tangent angle (labeled T in the diagram)
    radians = Math.atan2(b, a)

To find a and b if you know c and T
    a = Math.cos(T) * c
    b = Math.sin(T) * c

*/
