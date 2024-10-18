import { GameObject } from './GameObject.js';
import { canvasWidth, canvasHeight, player1, player2, gameState, setGameState, setWinner, resetGame } from './game.js';
import { Playing_Agent } from './Playing_Agent.js';
import { Projectile } from './Projectile.js';

import { either } from './utils.js';



class AI extends Playing_Agent {
  constructor(characterController, team) {

    const AIState = {
      
    };
    super(team[0], team);

    
    this.lastAttackTime = 0; // Initialize lastAttackTime
  }

  update() {


    super.update();

    // ! AI state would need to loop through object of states and callbacks 

  }


}

export { AI };
