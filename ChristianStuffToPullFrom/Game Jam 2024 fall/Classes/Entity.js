const baseHealth = 100;
const rayAmount = 360/10;
const rayJumpSize = 15;

class Entity{
    constructor(x,y,c1,c2){
        this.pos = createVector(x,y);
        this.size = {w: 30, h: 60};
        this.topColor = c1;
        this.bottomColor = c2;
        this.vel = createVector(0,0);
        this.hp = baseHealth;
        this.mhp = baseHealth;
        this.holding = -1;
        this.aimDir = 0;
        this.deleteBool = false;
        this.state = "";
        this.wanderPos = -1;
        this.wanderAncor = this.pos.copy();
        this.lastTarget = -1;
    }

    render(cx,cy){
        push();
        noStroke();
        fill(this.topColor);
        rect(this.pos.x-(this.size.w/2)-cx+(width/2), this.pos.y-this.size.h-cy+(height/2), 30, 30);
        fill(this.bottomColor);
        rect(this.pos.x-(this.size.w/2)-cx+(width/2), this.pos.y-(this.size.h/2)-cy+(height/2), 30, 30);
        if(this.hp < this.mhp){
            fill(0);
            rect(this.pos.x-(this.size.w/2)+3-cx+(width/2), this.pos.y-this.size.h-10-cy+(height/2), 24,8);
            fill(255,0,0);
            rect(this.pos.x-(this.size.w/2)+5-cx+(width/2), this.pos.y-this.size.h-8-cy+(height/2), (this.hp/this.mhp)*20,4);
        }
        if(this.holding != -1){
            this.holding.render(this.pos.x-cx+(width/2),this.pos.y-(this.size.h/2)-cy+(height/2), this.aimDir);
        }
        pop();
    }

    update(){
        this.pos.add(this.vel);
        for(let i=0; i<walls.length; i++){
            if(walls[i].colliding(this.pos.x, this.pos.y,15,0)){
                if(this.vel.x/abs(this.vel.x) == (walls[i].pos.x-this.pos.x)/abs(walls[i].pos.x-this.pos.x)){
                    this.pos.x -= this.vel.x;
                }
            }
            if(walls[i].colliding(this.pos.x, this.pos.y,0,5)){
                this.pos.y -= this.vel.y;
            }
        }
        for(let i=0; i<hostages.length; i++){
           if(this.pos.dist(hostages[i].pos) > 0 && this.pos.dist(hostages[i].pos) < 30){
                this.pos.sub(this.vel);
           }
        }
        for(let i=0; i<enemies.length; i++){
            
            if(this.pos.dist(enemies[i].pos) > 0 && this.pos.dist(enemies[i].pos) < 30){
                this.pos.sub(this.vel);
           }
        }
        for(let i=0; i<pickups.length; i++){
            if(pickups[i].colliding(this.pos.x, this.pos.y,15,15)){
                if(pickups[i].type == 0){ //health
                    if(this.hp < this.mhp){
                        this.hp += 20;
                        if(this.hp > this.mhp){this.hp = this.mhp}
                        pickups[i].deleteBool = true;
                    }
                }
                if(pickups[i].type == 1){ //ammo
                    if(this.holding != -1){
                        if(this.holding.ammo < gunInfo[this.holding.type].ammo){
                            this.holding.ammo = gunInfo[this.holding.type].ammo;
                            this.holding.shotsTillReload = gunInfo[this.holding.type].shotsTillReload;
                            this.holding.reloadTime = gunInfo[this.holding.type].reloadTime;
                            pickups[i].deleteBool = true;
                        }
                    }
                }
            }
        }
        if(this.holding != -1){
            this.holding.update();
        }
        if(this.hp <= 0){
            this.deleteBool = true;
        }
    }

    colliding(x,y,lx,ly){
        if(x > this.pos.x-(this.size.w/2)-lx && x < this.pos.x+(this.size.w/2)+lx){
            if(y > this.pos.y-this.size.h-ly && y < this.pos.y+ly){
                return true;
            }
        }
        return false;
    }

    look(r, arr){
        //arr is what to look for
        //fill(255,0,0,100);
        //circle(this.pos.x-cam.pos.x+(width/2), this.pos.y-cam.pos.y+(height/2), r*2);
        let ray = createVector(0,0);
        let incriemnt = createVector(rayJumpSize,0);
        let found = [];
        for(let i=0; i<rayAmount; i++){
            ray.x = this.pos.x;
            ray.y = this.pos.y;
            incriemnt.setHeading((i/rayAmount)*(2*PI));
            let foundWallPos = -1;
            let foundObj = -1;
            let foundObjPos = -1;
            for(let cr = 0; cr < r; cr+= rayJumpSize){
                for(let j=0; j<walls.length; j++){
                    if(walls[j].colliding(ray.x, ray.y, 1, 1)){
                        foundWallPos = ray.copy();
                        cr=r;
                    }
                }
                ray.add(incriemnt);
            }
            ray.x = this.pos.x;
            ray.y = this.pos.y;
            for(let cr=0; cr<r; cr+= rayJumpSize){
                for(let j=0; j<arr.length; j++){
                    if(arr[j].colliding(ray.x, ray.y, 1, 1)){
                        //line(this.pos.x-cam.pos.x+(width/2), this.pos.y-cam.pos.y+(height/2), ray.x-cam.pos.x+(width/2), ray.y-cam.pos.y+(height/2));
                        foundObj = arr[j];
                        foundObjPos = ray.copy();
                        cr=r;
                    }
                }
                ray.add(incriemnt);
            }
            if(foundObj != -1){
                if(foundWallPos != -1){
                    if(this.pos.dist(foundObjPos) < this.pos.dist(foundWallPos)){
                        found.push(foundObj);
                    }
                }
                else{
                    found.push(foundObj);
                }
            }
        }

        return found;
    }
}