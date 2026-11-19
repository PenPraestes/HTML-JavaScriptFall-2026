/*-------------------------------
Booleans to store whether a specific button is pressed or not
 --------------------------------*/
//add more boolean vars for any other keys you might want to use
var w = false;
var a = false;
var s = false;
var d = false;

/*---Key Press Code-----------*/
//add new if statements to both the press and release functions to add new key bindings.

document.addEventListener(`keydown`, press);
function press(e)
{
    console.log(e.keyCode)
    if(e.keyCode == 87){w = true}
    if(e.keyCode == 83){s = true;}
    if(e.keyCode == 65){a = true;}
    if(e.keyCode == 68){d = true;}
}

/*---Key Release Code-----------*/
document.addEventListener(`keyup`, release);
function release(e)
{
    if(e.keyCode == 87){w = false;}
    if(e.keyCode == 83){s = false;}
    if(e.keyCode == 65){a = false;}
    if(e.keyCode == 68){d = false;}
}

//The mouse object allows you to track the mouse.
var mouse = {x:0 ,y:0, pressed:false}
document.addEventListener(`mousemove`, move)
document.addEventListener(`mouseup`, rest)
document.addEventListener(`mousedown`, action)

//captures mouse coordinates
function move(e)
{
    const rect = c.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
}
//keeps track of if the mouse is pressed
function action(e)
{
    mouse.pressed = true;
}
//keeps track of if the mouse is not pressed
function rest(e)
{
    mouse.pressed = false;
}
//collision detection between mouse and objects.
function clicked(_obj)
{
    if(_obj.isOverPoint(mouse) && mouse.pressed == true)
    {
        return true
    }
    return false;
}