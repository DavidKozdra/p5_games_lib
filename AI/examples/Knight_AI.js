import { GameObject } from './GameObject.js';


class Knight_AI extends AI {

  constructor(Controlled_Entity, team) {
    super(team[0], team);

    this.KnightAIState = {
        swinging:swing(),
        idle:nothing(),
        left:Controlled_Entity.applyMovement()
    };
    this.lastAttackTime = 0; // Initialize lastAttackTime
  }

  update() {


    super.update();

    // ! AI state would need to loop through object of states and callbacks 

  }


}

export { AI };
