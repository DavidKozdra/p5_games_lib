import { GameObject } from './GameObject.js';


class AI extends Entity {
  constructor(Controlled_Entity, team) {

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
