class GameObject {
  constructor() {
    this.loc = [0, 0, 0];
    this.rot = [0, 0, 0];
    this.isTrigger = false;
    this.collissionRadius = 1.0;
    this.velocity = [0, 0, 0];
    this.angVelocity = [0, 0, 0];
    this.name = "default";
    this.id = 0;
    this.prefab;
    this.transform = new Transform();
  }
  
    draw(cameraX, cameraY, playerX, playerY, lightingSpots) {
      // Implement drawing logic in subclasses
    }
  
    update() {
      // Implement update logic in subclasses
    }
  
    Move() {
      var tempP = [0, 0, 0];
      for (var i = 0; i < 3; i++) {
        tempP[i] = this.loc[i];
        tempP[i] += this.velocity[i];
        this.rot[i] += this.angVelocity[i];
      }
      if (!this.isTrigger) {
        var clear = true;
        for (var so in m.Solid) {
          if (m.Solid[so] != this) {
            if (
              m.CheckCollision(
                tempP,
                this.collissionRadius,
                m.Solid[so].loc,
                m.Solid[so].collissionRadius
              )
            ) {
              //console.log("Collision");
        this.OnCollision(m.Solid[so]);
              clear = false;
            }
          }
        }
        if (clear) {
          this.loc = tempP;
        }
      } else {
        this.loc = tempP;
      }
    }
  

    onCollision(other) {
      // Implement collision logic in subclasses
    }
  }
  