
class Door extends GameObject {
    constructor(x, y, targetLevel) {
      super(x, y);
      this.targetLevel = targetLevel;
    }
  
    draw(cameraX, cameraY, playerX, playerY, lightingSpots) {
      let brightness = 255;
      for (let spot of lightingSpots) {
        let distance = dist(spot.x, spot.y, this.x, this.y);
        let spotBrightness = map(distance, 0, 400, 255, 50);
        brightness = min(brightness, spotBrightness);
      }
      brightness = constrain(brightness, 50, 255);
      fill(0, 0, 255, brightness);
      rect(this.x - cameraX - 25, this.y - cameraY - 25, 50, 50);
    }
  
    checkCollision(playerX, playerY) {
      return playerX > this.x - 25 && playerX < this.x + 25 && playerY > this.y - 25 && playerY < this.y + 25;
    }

    onCollision(player) {
      // Implement collision logic for Door
      loadLevel(this.targetLevel);
    }
    
  }