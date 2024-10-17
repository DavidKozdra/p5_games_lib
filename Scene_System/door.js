
class Door extends GameObject {
    constructor(x, y, targetLevel) {
      super(x, y);
      this.targetLevel = targetLevel;
    }
  
    draw(cameraX, cameraY) {
    }
  
    checkCollision(playerX, playerY) {
      return playerX > this.x - 25 && playerX < this.x + 25 && playerY > this.y - 25 && playerY < this.y + 25;
    }

    onCollision(player) {
      // Implement collision logic for Door
      loadLevel(this.targetLevel);
    }
    
  }