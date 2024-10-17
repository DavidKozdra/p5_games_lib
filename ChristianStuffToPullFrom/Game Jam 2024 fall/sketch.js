var bgPng;
var wallsPng;
var pickupImgs = [];
function preload(){
    bgPng = loadImage("Assets/background.png");
    wallsPng = loadImage("Assets/wallTops.png");
    pickupImgs.push(loadImage("Assets/healthPickup.png"));
    pickupImgs.push(loadImage("Assets/ammoPickup.png"));
}

const playerSpeed = 5;

var player;
var cam = {};
var bullets = [];
var renderArr = [];
var scoreTime = 0;
var score = 0;

function setup(){
    createCanvas(1280,720);
    player = new Entity(2800, 800, color("#D4C2B6"), color("#7C6DA2"));
    player.holding = new Gun(2);
    cam.pos = player.pos.copy();
    cam.vel = createVector(0,0);
    cam.shake = {intensity: 0, length: 0};
    setupMap();
    renderArr.push(player);

    renderArr.sort((a,b) => a.pos.y-b.pos.y);
}

function draw(){
    image(bgPng, -cam.pos.x+(width/2), -cam.pos.y+(height/2));
    
    let allSaved = true;
    hostageThink();
    for(let i=0; i<hostages.length; i++){
        hostages[i].update();
        if(hostages[i].state != "saved"){
            allSaved = false;
        }
        if(hostages[i].deleteBool){
            hostages.splice(i, 1);
            i--;
        }
    }
    
    enemyThink();
    for(let i=0; i<enemies.length; i++){
        enemies[i].update();
        if(enemies[i].deleteBool){
            score += 30;
            enemies.splice(i, 1);
            i--;
        }
    }
    
    for(let i=0; i<pickups.length; i++){
        if(pickups[i].deleteBool){
            pickups.splice(i, 1);
            i--;
        }
    }
    
    takeInput();
    player.update();
    
    for(let i=0; i<bullets.length; i++){
        bullets[i].update();
        bullets[i].render(cam.pos.x,cam.pos.y);
        if(bullets[i].deleteBool){
            bullets.splice(i, 1);
            i--;
        }
    }
    
    renderArr.sort((a,b) => a.pos.y-b.pos.y);
    for(let i=0; i<renderArr.length; i++){
        renderArr[i].render(cam.pos.x, cam.pos.y);
        if(renderArr[i].deleteBool){
            renderArr.splice(i, 1);
            i--;
        }
    }
    image(wallsPng, -cam.pos.x+(width/2), -cam.pos.y+(height/2));
    moveCamera();

    //ui
    if(!allSaved){scoreTime ++;}
    push();
    //hp
    strokeWeight(4);
    fill(0,0,0);
    rect(12, height-62, 500, 20);
    fill(255,0,0);
    rect(12, height-61, (player.hp/player.mhp)*500, 18);
    //ammo
    fill(0);
    rect(12, height-32, 500, 20);
    fill(255,255,0);
    rect(12, height-31, (player.holding.ammo/gunInfo[player.holding.type].ammo)*500, 18);
    for(let i=0; i<gunInfo[player.holding.type].ammo; i++){
        if(i%gunInfo[player.holding.type].shotsTillReload == 0 && i != 0){
            stroke(0,255,0);
            strokeWeight(3);
        }
        else{
            stroke(0);
            strokeWeight(2);
        }
        line(12+(i*(500/gunInfo[player.holding.type].ammo)),height-32,12+(i*(500/gunInfo[player.holding.type].ammo)),height-12);
    }
    //score
    strokeWeight(4);
    fill(200);
    rectMode(CENTER);
    textSize(25);
    rect(width/2, 28, 20+textWidth("score: "+score+" Time: "+round(scoreTime/60)+"s"), 50);
    fill(0);
    strokeWeight(1);
    textAlign(CENTER, CENTER);
    text("score: "+score+" Time: "+round(scoreTime/60)+"s", width/2, 28);
    //timer
    
    if(allSaved){
        fill("#557D55");
        rect(width-70, 30, 130, 50);
        fill(0);
        text("restart?", width-70, 30);
        if(mouseIsPressed){
            if(mouseX > (width-70)-(130/2) && mouseX < (width-70)+(130/2)){
                if(mouseY > 30-(50/2) && mouseY < 30+(50/2)){
                    player.pos.x=2800;
                    player.pos.y=800;
                    player.vel.setMag(0);
                    player.holding.ammo = gunInfo[player.holding.type].ammo;
                    player.holding.shotsTillReload = gunInfo[player.holding.type].shotsTillReload;
                    player.holding.reloadTime = gunInfo[player.holding.type].reloadTime;
                    cam.pos = player.pos.copy();
                    cam.vel.setMag(0);
                    cam.shake = {intensity: 0, length: 0};
                    setupMap();
                    renderArr.push(player);

                    renderArr.sort((a,b) => a.pos.y-b.pos.y);
                    allSaved=false;
                }
            }
        }
    }
    pop();
}

function moveCamera(){
    if(cam.shake.length > 0){
        if(cam.vel.mag() < 1){
            cam.vel.x = cam.shake.intensity;
        }
        cam.vel.setMag(cam.vel.mag()+cam.shake.intensity);
        if(cam.vel.mag() > cam.shake.intensity*5){
            cam.vel.setMag(cam.shake.intensity*5);
        }
        cam.vel.rotate(random(PI/4, PI));
        cam.shake.length -= 1;
    }
    else{
        cam.vel.x = (player.pos.x-cam.pos.x);
        cam.vel.y = (player.pos.y-cam.pos.y);
        cam.vel.setMag(cam.vel.mag()/10);
    }
    cam.pos.add(cam.vel);
    if(cam.pos.x < (width/2)){
        cam.pos.x -= cam.vel.x;
    }
    if(cam.pos.x > 3600-(width/2)){
        cam.pos.x -= cam.vel.x;
    }
    if(cam.pos.y < (height/2)){
        cam.pos.y -= cam.vel.y;
    }
    if(cam.pos.y > 1440-(height/2)){
        cam.pos.y -= cam.vel.y;
    }
}

function takeInput(){
    player.vel.x = 0;
    player.vel.y = 0;
    if(keyIsDown(87)){ //w
        player.vel.y = -playerSpeed;
    }
    if(keyIsDown(65)){ //a
        player.vel.x = -playerSpeed;
    }
    if(keyIsDown(83)){ //s
        player.vel.y = playerSpeed;
    }
    if(keyIsDown(68)){ //d
        player.vel.x = playerSpeed;
    }

    if(player.holding != -1){
        player.aimDir = createVector(
            mouseX-(player.pos.x-cam.pos.x+(width/2)),
            mouseY-(player.pos.y-(player.size.h/2)-cam.pos.y+(height/2))
        ).heading();

        if(mouseIsPressed){
            if(player.holding.ready()){
                if(player.holding.shotsTillReload > 0){
                    player.holding.shoot(player.pos.x,player.pos.y-(player.size.h/2), player.aimDir);
                }
                else{
                    player.holding.reload();
                }
            }
        }
    }
}