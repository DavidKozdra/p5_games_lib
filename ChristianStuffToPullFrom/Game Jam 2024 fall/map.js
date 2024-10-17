var hostages = [];
var enemies = [];
var walls = [];
var pickups = [];

function setupMap(){
    hostages = [];
    hostages.push(new Entity(300, 200, color("#D4C2B6"), color("#668DA9")));
    hostages.push(new Entity(200, 400, color("#D4C2B6"), color("#3E554C")));
    hostages.push(new Entity(400, 1200, color("#D4C2B6"), color("#668DA9")));
    hostages.push(new Entity(700, 1100, color("#D4C2B6"), color("#3E554C")));

    enemies = [];
    enemies.push(new Entity(2000, 400, color("#D4C2B6"), color("#353540")));
    enemies.push(new Entity(2400, 400, color("#D4C2B6"), color("#353540")));
    enemies.push(new Entity(2000, 1200, color("#D4C2B6"), color("#353540")));
    enemies[0].holding = new Gun(0);
    enemies[1].holding = new Gun(1);
    enemies[2].holding = new Gun(2);

    walls = [];
    walls.push(new Wall(100,  0,    2560, 100));
    walls.push(new Wall(2660, 0,    100,  720));
    walls.push(new Wall(2660, 870,  100,  570));
    walls.push(new Wall(0,    0,    100,  1440));
    walls.push(new Wall(100,  1340, 2560, 100));
    walls.push(new Wall(100,  600,  300,  100));
    walls.push(new Wall(500,  100,  100,  600));
    
    walls.push(new Wall(100,  900,  100,  100));
    walls.push(new Wall(300,  900,  500,  100));
    walls.push(new Wall(800,  500,  100,  950));
    walls.push(new Wall(800,  100,  100,  300));
    walls.push(new Wall(1050,  180,  50,  300));
    walls.push(new Wall(1050,  580,  50,  300));
    walls.push(new Wall(1050,  980,  50,  300));

    walls.push(new Wall(1450,  900,  250,  100));
    walls.push(new Wall(1400,  900,  100,  500));
    walls.push(new Wall(1850,  900,  250,  100));
    walls.push(new Wall(1800,  900,  100,  500));
    walls.push(new Wall(2200,  900,  100,  500));
    
    walls.push(new Wall(1450,  500,  250,  100));
    walls.push(new Wall(1400,  100,  100,  500));
    walls.push(new Wall(1800,  100,  100,  500));

    pickups = [];
    pickups.push(new Pickups(700, 150, 0));
    pickups.push(new Pickups(300, 300, 0));
    pickups.push(new Pickups(2200, 700, 1));
    pickups.push(new Pickups(2200, 200, 1));
    pickups.push(new Pickups(2200, 500, 1));

    renderArr = [];
    for(let i=0; i<hostages.length; i++){
        renderArr.push(hostages[i]);
    }
    for(let i=0; i<enemies.length; i++){
        renderArr.push(enemies[i])
    }
    for(let i=0; i<pickups.length; i++){
        renderArr.push(pickups[i])
    }
}