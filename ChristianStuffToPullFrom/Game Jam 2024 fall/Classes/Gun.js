const gunInfo = [
    {ammo:20,damage:5,bulletSpeed:5,reloadTime:40,shotsTillReload:5,fireRate:20,length:30}, //pistol
    {ammo:8,damage:20,bulletSpeed:4,reloadTime:80,shotsTillReload:2,fireRate:20,length:40}, //shotgun
    {ammo:100,damage:2,bulletSpeed:5,reloadTime:40,shotsTillReload:50,fireRate:5,length:30}, //MINIGUN
];

class Gun{
    constructor(type){
        this.type = type;
        this.ammo = gunInfo[this.type].ammo;
        this.damage = gunInfo[this.type].damage;
        this.bulletSpeed = gunInfo[this.type].bulletSpeed;
        this.reloadTime = gunInfo[this.type].reloadTime;
        this.shotsTillReload = gunInfo[this.type].shotsTillReload;
        this.fireRate = gunInfo[this.type].fireRate;
        this.length = gunInfo[this.type].length;
    }

    render(x,y,aimDir){
        push();
        let start = createVector(x,y);
        let end = createVector(this.length,0);
        end.setHeading(aimDir);
        end.add(start);
        stroke(0);
        strokeWeight(10);
        line(start.x,start.y,end.x,end.y);
        pop();
    }

    ready(){
        if(this.ammo <= 0){
            return false;
        }
        if(this.reloadTime > 0){
            return false;
        }
        if(this.fireRate > 0){
            return false;
        }
        return true;
    }

    update(){
        if(this.fireRate > 0){
            this.fireRate --;
        }
        if(this.reloadTime > 0){
            this.reloadTime --;
        }
    }

    shoot(x,y,aimDir){
        let start = createVector(x,y);
        let end = createVector(this.length,0);
        end.setHeading(aimDir);
        end.add(start);
        bullets.push(new Bullet(end.x,end.y,aimDir,this.damage,this.bulletSpeed));
        this.ammo -= 1;
        this.shotsTillReload -= 1;
        this.fireRate = gunInfo[this.type].fireRate;
    }

    reload(){
        this.shotsTillReload = gunInfo[this.type].shotsTillReload;
        this.reloadTime = gunInfo[this.type].reloadTime;
    }
}

class Bullet{
    constructor(x,y,dir,damage,speed){
        this.pos = createVector(x,y);
        this.vel = createVector(speed,0);
        this.vel.setHeading(dir);
        this.damage = damage;
        this.deleteBool = false;
    }

    render(cx,cy){
        push();
        fill(0);
        circle(this.pos.x-cx+(width/2),this.pos.y-cy+(height/2), 5);
        pop();
    }

    update(){
        this.pos.add(this.vel);
        for(let i=0; i<walls.length; i++){
            if(walls[i].colliding(this.pos.x, this.pos.y,0,0)){
                this.damage = 0;
                this.deleteBool = true;
            }
        }
        for(let i=0; i<hostages.length; i++){
            if(hostages[i].colliding(this.pos.x, this.pos.y, 1, 1)){
                hostages[i].hp -= this.damage;
                this.damage = 0;
                this.deleteBool = true;
            }
        }
        for(let i=0; i<enemies.length; i++){
            if(enemies[i].colliding(this.pos.x, this.pos.y, 1, 1)){
                enemies[i].hp -= this.damage;
                this.damage = 0;
                this.deleteBool = true;
            }
        }
        if(this.pos.dist(createVector(player.pos.x,player.pos.y-30)) < 30){
            cam.shake.intensity = this.damage;
            cam.shake.length = 5;
            player.hp -= this.damage;
            this.damage = 0;
            this.deleteBool = true;
        }
    }
}