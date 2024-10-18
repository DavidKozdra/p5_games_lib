class GameObject {
    constructor(x, y, tag) {
      this.x = x;
      this.y = y;
      this.tag= tag;
      
    }
  
    draw(cameraX, cameraY, playerX, playerY, lightingSpots) {
      // Implement drawing logic in subclasses
    }
  
    update() {
      // Implement update logic in subclasses
    }
  
    checkColliding(x,y,lx,ly){
      if(x > this.pos.x-lx && x < this.pos.x+this.size.w+lx){
          if(y > this.pos.y-ly && y < this.pos.y+this.size.h+ly){
              return true;
          }
      }
      return false;
    }

    onCollision(other) {
      // Implement collision logic in subclasses
    }
  }
  