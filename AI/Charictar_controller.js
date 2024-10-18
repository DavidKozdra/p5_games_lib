import { GameObject } from './GameObject.js';
import { canvasWidth, canvasHeight, player1, player2, gameState, setGameState, setWinner, resetGame } from './game.js';
import { Projectile } from './Projectile.js';
import { Fist } from './fist.js';

class charController extends GameObject {
  constructor(x, y, controllable=true, spirit=[0, 0, 200], name) {
    super('player');
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
    if (!this.isFlying) {
      this.velocityY += this.gravity;
    }
  }

  applyMovement(direction) {
    // Reset acceleration
    this.accelerationX = 0;
    this.accelerationY = 0;
  
    // Apply acceleration based on direction
    switch (direction) {
      case 'left':
        this.accelerationX = -0.5;
        break;
      case 'right':
        this.accelerationX = 0.5;
        break;
      case 'up':
        if (this.isFlying) {
          this.accelerationY = -0.5; // Move up if flying (negative direction in p5.js)
        }
        break;
      case 'down':
        if (this.isFlying) {
          this.accelerationY = 0.5; // Move down if flying
        }
        break;
      default:
        // No movement if no valid direction is provided
        break;
    }
  
    // Update velocity based on acceleration
    this.velocityX += this.accelerationX;
    this.velocityY += this.accelerationY;
  
    // Limit the speed
    this.velocityX = constrain(this.velocityX, -this.maxSpeed, this.maxSpeed);
    this.velocityY = constrain(this.velocityY, -this.maxSpeed, this.maxSpeed);
  }
  


}

export { charController };
