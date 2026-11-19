class GameObject
{
    constructor(_id=`#default`)
    {     
    /*Object properties (or attributes)*/
    //object position
     this.x=c.width/2;
     this.y=c.height/2;
     //object angle
     this.angle = 0;
     //object dimensions
     this.w=100;
     this.h=100;
     //object velocity
     this.vx=0;
     this.vy=0;
    //object color
     this.color = `hotpink`

     this.img = {
        src:document.querySelector(_id),
        scale:{x:1,y:1},
        w:0,
        h:0,
        sx:0,
        sy:0,
        sw:0,
        sh:0, 
        } 
        this.img.w=this.img.src.width
        this.img.h=this.img.src.height
        this.img.sx=0
        this.img.sy=0
        this.img.sw=this.img.src.width
        this.img.sh=this.img.src.height 
    }

    setImage(_id)
    {
        this.img.src=document.querySelector(_id)
        this.img.w=this.img.src.width
        this.img.h=this.img.src.height
        this.img.sx=0
        this.img.sy=0
        this.img.sw=this.img.src.width
        this.img.sh=this.img.src.height
    }

    graphic(_x=0,_y=0)
    {
        ctx.save();
        ctx.fillStyle = this.color
        ctx.translate(this.x+_x, this.y+_y)
        ctx.scale(this.img.scale.x, this.img.scale.y)
        ctx.rotate(this.angle*Math.PI/180)
        ctx.drawImage(
            this.img.src,
            this.img.sx,
            this.img.sy, 
            this.img.sw,
            this.img.sh,
            -this.img.w/2, 
            -this.img.h/2, 
            this.img.w, 
            this.img.h
            )
        ctx.restore();
    }

    //Draws a rectangle 
    render()
    {
        ctx.save();
            ctx.fillStyle = this.color
            ctx.translate(this.x, this.y)
            ctx.rotate(this.angle*Math.PI/180)
            ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h)
        ctx.restore();
    }

    //Moves an object by adding it's velocity to it's position on each axis
    move()
    {
        this.x = this.x + this.vx
        this.y = this.y + this.vy
    }

    //Each function below returns a sides of this object's bounding box
    top()
    {
        return {x:this.x, y:this.y - this.h/2};
    }
    bottom()
    {
        return {x:this.x, y:this.y + this.h/2};
    }
    left()
    {
        return {x:this.x - this.w/2, y:this.y};
    }
    right()
    {
        return {x:this.x + this.w/2, y:this.y};
    }

    /*-------Collision Function ----------------
    Used to check for collision between 2 objects
    This method checks to see where the various sides of one object are in relationship to another object's sides
    -------------------------------------------*/
    overlaps(_obj)
    {
        if(
            this.top().y < _obj.bottom().y &&
            this.bottom().y > _obj.top().y &&
            this.left().x < _obj.right().x &&
            this.right().x > _obj.left().x
        )
        {
            
            return true
        }
        return false;
    }
    isOverPoint(_point)
    {
        if(
            this.top().y < _point.y &&
            this.bottom().y > _point.y &&
            this.left().x < _point.x &&
            this.right().x > _point.x
        )
        {
            return true
        }
        return false; 
    }
}