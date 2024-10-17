class Camera {
  constructor(x, y, boundaryX=100, boundaryY=100) {
    this.x = x;
    this.y = y;
    this.boundaryX = boundaryX;
    this.boundaryY = boundaryY;
  }

  follow(target) {
    // Constrain the camera to follow the target within the boundary
    let targetX = constrain(target.x, this.x - this.boundaryX, this.x + this.boundaryX);
    let targetY = constrain(target.y, this.y - this.boundaryY, this.y + this.boundaryY);

    this.x = lerp(this.x, targetX, 0.1);
    this.y = lerp(this.y, targetY, 0.1);
  }

  apply() {
    translate(width / 2 - this.x, height / 2 - this.y);
  }
}
