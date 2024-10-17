
class Item extends GameObject {
    constructor(x, y, effect) {
      super(x, y);
      this.effect = effect;
    }
  
    draw(cameraX, cameraY, playerX, playerY, lightingSpots) {
      fill(0, 255, 0);
      rect(this.x - cameraX, this.y - cameraY, 20, 20);
    }
  
    applyEffect(player) {
      this.effect(player);
    }
  
    checkCollision(playerX, playerY) {
      return dist(playerX, playerY, this.x, this.y) < 20;
    }
  }