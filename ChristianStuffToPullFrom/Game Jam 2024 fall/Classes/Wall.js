class Wall{
    constructor(x,y,w,h){
        this.pos = createVector(x,y);
        this.size = {w: w,h: h};
    }

    render(cx,cy){
        push();
        fill(150);
        stroke(0);
        strokeWeight(2);
        rect(this.pos.x-cx+(width/2), this.pos.y-25-cy+(height/2), this.size.w, this.size.h+25);
        line(this.pos.x-cx+(width/2), this.pos.y+this.size.h-25-cy+(height/2), this.pos.x+this.size.w-cx+(width/2), this.pos.y+this.size.h-25-cy+(height/2));
        pop();
    }

    colliding(x,y,lx,ly){
        if(x > this.pos.x-lx && x < this.pos.x+this.size.w+lx){
            if(y > this.pos.y-ly && y < this.pos.y+this.size.h+ly){
                return true;
            }
        }
        return false;
    }
}