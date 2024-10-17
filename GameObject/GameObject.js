class GameObject {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    draw(cameraX, cameraY, playerX, playerY, lightingSpots) {
      // Implement drawing logic in subclasses
    }
  
    update() {
      // Implement update logic in subclasses
    }
  
    checkCollision(playerX, playerY) {
      // Implement collision logic in subclasses
    }

    onCollision(other) {
      // Implement collision logic in subclasses
    }
  }
  