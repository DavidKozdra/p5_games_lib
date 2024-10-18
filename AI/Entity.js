
import { GameObject } from './GameObject.js';

// functionally movable sent commands from somewhere else 
class Entity extends GameObject {
  constructor(x, y, controllable=true, name) {
    super();
    this.x = x;
    this.y = y;

  }

  draw() {

  }

  update() {
    this.applyGravity();
    this.applyMovement();
    this.checkGrounded();


    if (this.isJumping) {
      this.jump();
    }
  }

  applyGravity() {

  }

  applyMovement(direction) {
  }
  


}

export { Entity };
