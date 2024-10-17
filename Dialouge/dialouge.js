class Dialouge {
    constructor(phrase, replies = [], hand_num, amount){
        this.phrase = phrase;
        this.phrase2 = [];
        for(let i = 0; i < this.phrase.length; i++){
          this.phrase2[i] = this.phrase[i];
        }
        this.phrase = [];
        this.new_phrase = -1;
        this.replies = replies;
        for(let i = 0; i < this.replies.length; i++){
            if(this.replies[i].quest != -1){
                this.replies[i].quest = new Quest(this.replies[i].quest.name, this.replies[i].quest.goals, this.replies[i].quest.days, this.replies[i].quest.reward_item, this.replies[i].quest.reward_coins);
            }
        }
        this.new_replies = -1;
        this.hand_num = hand_num;
        this.amount = amount;
        this.textWait = 1;
        this.maxTextWait = this.textWait;
        this.text_i = -1;
        this.done = false;
        this.noise = true;
    }

    render(name, inv){
        push();
        stroke(149, 108, 65);
        strokeWeight(5);
        fill(187, 132, 75);
        rect(canvasWidth / 20, canvasHeight - 150, canvasWidth - (canvasWidth/10), 150);
        rect(canvasWidth / 20, canvasHeight - 150, (canvasWidth / 2) - (canvasWidth/10) + 20, 150);
        textFont(player_2);
        textSize(15);
        fill(255);
        stroke(0);
        strokeWeight(4);
        text(name, (canvasWidth / 20) + 10, canvasHeight - 140);
        text('Replies:', (canvasWidth / 2) - 10, canvasHeight - 140);
        textSize(13);
        strokeWeight(2);
        text(String.fromCharCode(eat_button) + ' to leave', ((3*canvasWidth) / 4) + 10, canvasHeight - 140);
        if (this.done == false){
            this.textWait -= 1;
            if(this.textWait <= 0){
                this.text_i += 1;
                this.textWait = this.maxTextWait
            }
            this.phrase[this.text_i] = this.phrase2[this.text_i];
            text(this.phrase.join(''), (canvasWidth / 20) + 10, canvasHeight - 115, (canvasWidth / 2) - (canvasWidth / 20) - 20);
            if(this.noise){
                npc_talkingSound.play();
            }
            this.noise = !this.noise;
            if (this.text_i == this.phrase2.length - 1){
                this.done = true;
                if(this.hand_num != -1 && inv[this.hand_num] != 0 && inv[this.hand_num].amount > 0){
                    if (this.amount >= inv[this.hand_num].amount){
                        if(checkForSpace(player, item_name_to_num(inv[this.hand_num].name))){
                            addItem(player, item_name_to_num(inv[this.hand_num].name), inv[this.hand_num].amount);
                            inv[this.hand_num].amount = 0;
                            this.new_phrase = [];
                            let phrase = "Sorry I dont have any more " + inv[this.hand_num].name;
                            for(let i = 0; i < phrase.length; i++){
                                this.new_phrase[i] = phrase[i];
                            }
                            this.new_replies = [];
                            this.new_replies[0] = {phrase: 'Oh ok', dialouge_num: -1, quest: -1};
                        }
                    }
                    else {
                        if(checkForSpace(player, item_name_to_num(inv[this.hand_num].name))){
                            addItem(player, item_name_to_num(inv[this.hand_num].name), this.amount);
                            inv[this.hand_num].amount -= this.amount;
                        }
                    }
                }
            }
        }
        else{
            text(this.phrase2.join(''), (canvasWidth / 20) + 10, canvasHeight - 115, (canvasWidth / 2) - (canvasWidth / 20) - 20);
        }
        stroke(0);
        let current_y = 0;
        let new_line = 0;
        if(current_reply < 1 || this.replies.length <= 5){
            for (let i = 0; i < min(6-new_line, this.replies.length); i++){
                if(current_reply == i){
                    fill(255, 255, 0);
                    text('>' + this.replies[i].phrase, (canvasWidth / 2) - 10, canvasHeight - 115 + current_y, (canvasWidth / 2) - (canvasWidth / 20) - 10);
                }
                else{
                    fill(255);
                    text('-' + this.replies[i].phrase, (canvasWidth / 2) - 10, canvasHeight - 115 + current_y, (canvasWidth / 2) - (canvasWidth / 20) - 10);
                }
                current_y += (this.replies[i].phrase.length > 22 ? floor(this.replies[i].phrase.length/22)+1:1)*17;
                new_line += (this.replies[i].phrase.length > 22 ? floor(this.replies[i].phrase.length/22):0)
            }
        }
        else{
            for (let i = current_reply-1; i < min(current_reply + 6 - new_line, this.replies.length); i++){
                if(current_reply == i){
                    fill(255, 255, 0);
                    text('>' + this.replies[i].phrase, (canvasWidth / 2) - 10, canvasHeight - 115 + current_y, (canvasWidth / 2) - (canvasWidth / 20) - 10);
                }
                else{
                    fill(255);
                    text('-' + this.replies[i].phrase, (canvasWidth / 2) - 10, canvasHeight - 115 + current_y, (canvasWidth / 2) - (canvasWidth / 20) - 10);
                }
                current_y += (this.replies[i].phrase.length > 22 ? ceil(this.replies[i].phrase.length/22):1)*17;
                new_line += (this.replies[i].phrase.length > 22 ? ceil(this.replies[i].phrase.length/22):0);
            }
        }
        if(current_reply < this.replies.length - 5){
            image(done_dot, (canvasWidth / 20) + 632, (canvasHeight - 90) + (2 * 32) + 8);
        }
        if(current_reply > 1 && this.replies.length > 6){
            image(up_dot, (canvasWidth / 20) + 632, (canvasHeight - 120));
        }
        pop()
    }
}