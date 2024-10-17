class LightingSpot extends GameObject {
  draw(cameraX, cameraY, playerX, playerY) {
    let distance = dist(playerX, playerY, this.x, this.y);
    let brightness = map(distance, 0, 400, 255, 50); // Adjust the range as needed
    brightness = constrain(brightness, 50, 255);
    fill(255, 255, 0, brightness); // Yellow with varying brightness
    ellipse(this.x - cameraX, this.y - cameraY, 30, 30);
  }



  onCollision() {
  }
  
}