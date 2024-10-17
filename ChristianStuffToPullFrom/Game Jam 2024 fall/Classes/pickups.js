

class Pickups{
    constructor(x,y,type){
        this.pos = createVector(x,y);
        this.type = type;
        this.deleteBool = false;
    }

    render(cx,cy){
        push();
        imageMode(CENTER);
        image(pickupImgs[this.type], this.pos.x-cx+(width/2), this.pos.y-cy+(height/2));
        pop();
    }

    colliding(x,y,lx,ly){
        if(x > this.pos.x-16-lx && x < this.pos.x+16+lx){
            if(y > this.pos.y-16-ly && y < this.pos.y+16+ly){
                return true;
            }
        }
        return false;
    }
}