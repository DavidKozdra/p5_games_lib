function hostageThink(){
    //hostages will have 3 states
    //follow: walk towards the player while avoiding enemies
    //run: player is too far to follow so run back to closest safe spot
    //sit: in a safe spot waiting for player
    //saved: sitting outside the building
    for(let i=0; i<hostages.length; i++){
        if(hostages[i].state == ""){
            hostages[i].state = "sit";
        }
        if(hostages[i].state == "sit"){
            hostages[i].vel.setMag(0);
            if(hostages[i].pos.x < 3100){ //if they are still inside
                if(hostages[i].pos.dist(player.pos) < 80){
                    hostages[i].state = "follow";
                }
                let found = hostages[i].look(300, enemies);
                if(found.length > 0){
                    found.sort((a,b) => hostages[i].pos.dist(a.pos)-hostages[i].pos.dist(b.pos));
                    hostages[i].lastTarget = found[0];
                    hostages[i].state = "run";
                }
            }
        }
        if(hostages[i].state == "follow"){
            for(let j=0; j<enemies.length; j++){
                if(hostages[i].pos.dist(enemies[j].pos) < 60){
                    hostages[i].state = "run";
                }
            }
            if(hostages[i].pos.x > 3100){
                score += 10+floor(hostages[i].hp/2);
                hostages[i].state = "saved";
            }
            if(hostages[i].state == "follow"){
                if(hostages[i].pos.dist(player.pos) > 50){ //only move if a little far
                    hostages[i].vel.add(player.pos);
                    hostages[i].vel.sub(hostages[i].pos);
                    hostages[i].vel.setMag(1.5);
                }
                else{
                    hostages[i].vel.setMag(0);
                }
            }
        }
        if(hostages[i].state == "run"){
            let safe = true;
            if(hostages[i].pos.dist(hostages[i].lastTarget.pos) < 300){
                hostages[i].vel.add(hostages[i].lastTarget.pos);
                hostages[i].vel.sub(hostages[i].pos);
                safe = false;
            }
            hostages[i].vel.setMag(-1.5);
            hostages[i].vel.rotate(random(-1,1)*PI/8);
            if(safe){
                hostages[i].state = "sit";
            }
        }
    }
}

function enemyThink(){
    //enemies will have 4 states
    //sit: can shoot at least 1 target from position
    //wander: killed last target, will walk around aimlessly
    //scared: will shoot blindly, caused by low health
    //findAmmo: has 0 ammo, will look for an ammo box
    for(let i=0; i<enemies.length; i++){
        if(enemies[i].state == ""){
            enemies[i].state = "wander";
        }
        if(enemies[i].state == "wander"){
            if(enemies[i].hp < enemies[i].mph/4){
                enemies[i].state = "scared";
            }
            if(enemies[i].holding.ammo > 0){
                let lookingFor = [];
                lookingFor.push(player);
                for(let j=0; j<hostages.length; j++){
                    lookingFor.push(hostages[j]);
                }
                let found = enemies[i].look(200, lookingFor);
                if(found.length > 0){
                    enemies[i].state = "sit";
                    found.sort((a,b) => enemies[i].pos.dist(a.pos)-enemies[i].pos.dist(b.pos));
                    enemies[i].lastTarget = found[0];
                }
            }
            if(enemies[i].state == "wander"){
                
                let safeWander = true;
                
                if(enemies[i].wanderPos != -1){
                    let ray = createVector(enemies[i].pos.x,enemies[i].pos.y);
                    let incriemnt = createVector(enemies[i].wanderPos.x-enemies[i].pos.x,enemies[i].wanderPos.y-enemies[i].pos.y);
                    incriemnt.setMag(rayJumpSize);
                    for(let cr = 0; cr < enemies[i].pos.dist(enemies[i].wanderPos); cr+= rayJumpSize){
                        if(safeWander){
                            for(let j=0; j<walls.length; j++){
                                if(walls[j].colliding(ray.x, ray.y, 1, 1)){
                                    safeWander = false;
                                    cr=enemies[i].pos.dist(enemies[i].wanderPos);
                                }
                            }
                            ray.add(incriemnt);
                        }
                    }
                }
                
                for(let j=0; j<hostages.length; j++){
                    if(hostages[j].colliding(enemies[i].wanderPos.x, enemies[i].wanderPos.y, 10, 10)){
                        safeWander = false;
                    }
                }
                if(enemies[i].wanderPos === -1 || enemies[i].pos.dist(enemies[i].wanderPos) < 5 || !safeWander){
                    enemies[i].wanderPos = enemies[i].pos.copy();
                    if(enemies[i].wanderPos.dist(enemies[i].wanderAncor) > 300){
                        enemies[i].wanderPos = enemies[i].wanderAncor.copy();
                    }
                    let temp = createVector(random(30,110),0);
                    temp.rotate(random(0,PI*2));
                    enemies[i].wanderPos.add(temp);
                }
                else{
                    enemies[i].vel.add(enemies[i].wanderPos);
                    enemies[i].vel.sub(enemies[i].pos);
                    enemies[i].vel.setMag(1.5);
                }

                if(enemies[i].holding.ammo == 0){
                    let lookingFor = [];
                    for(let j=0; j<pickups.length; j++){
                        if(pickups[j].type == 1){lookingFor.push(pickups[j])}
                    }
                    let found = enemies[i].look(200, lookingFor);
                    if(found.length > 0){
                        found.sort((a,b) => enemies[i].pos.dist(a.pos)-enemies[i].pos.dist(b.pos));
                        enemies[i].wanderPos = found[0].pos.copy();
                        enemies[i].wanderAncor = found[0].pos.copy();
                    }
                }
            }
        }
        if(enemies[i].state == "sit"){
            enemies[i].vel.setMag(0);
            if(enemies[i].hp < enemies[i].mph/4){
                enemies[i].state = "scared";
            }
            if(enemies[i].holding.ammo == 0){
                enemies[i].state = "wander";
            }
            if(enemies[i].pos.dist(enemies[i].lastTarget.pos) < 270){
                let temp = createVector(enemies[i].lastTarget.pos.x-enemies[i].pos.x, enemies[i].lastTarget.pos.y-enemies[i].pos.y);
                temp.setMag(1);
                enemies[i].aimDir = temp.heading();
                if(enemies[i].holding.ready()){
                    if(enemies[i].holding.shotsTillReload > 0){
                        enemies[i].holding.shoot(enemies[i].pos.x,enemies[i].pos.y-(enemies[i].size.h/2), enemies[i].aimDir);
                    }
                    else{
                        enemies[i].holding.reload();
                    }
                }
            }
            else{
                enemies[i].wanderAncor = enemies[i].lastTarget.pos.copy();
                enemies[i].wanderPos = enemies[i].lastTarget.pos.copy();
                enemies[i].state = "wander";
            }
        }
    }
}