export const states = {
    'STANDING' : 0,
    'RUNNING' : 1,
    'FIGHTING' : 2,
    'DIZZY' : 3
}
class State{
    constructor(player){
        this.player = player;
        this.frameTimer = 0;
    }

    enter(deltaTime){
        this.frameTimer += deltaTime;
        if(this.frameTimer > this.frameInterval){
            this.player.frameX++;
            if(this.player.frameX > this.maxFrame){
                this.player.frameX = 0;
            }
            this.frameTimer = 0;
        }
    }
}

export class Standing extends State{
    constructor(player){
        super(player);
        this.state = 'STANDING';
        this.maxFrame = 9;
        this.frameInterval = 50;
    }

    enter(deltaTime){
        this.player.frameY = 6;
        super.enter(deltaTime);
        if(this.player.frameX === 3) this.player.frameX++;
    }

    handleInput(input, deltaTime){
        // if(input.keys.bottom.pressed){
        //     this.player.changeState(states.SITTING);
        if(input.keys.right.pressed || input.keys.left.pressed){
            this.player.frameX = 0;
            this.player.changeState(states.RUNNING);
        }else if(input.keys.fight.pressed){
            this.player.frameX = 0;
            this.player.changeState(states.FIGHTING);
        }
    }
}

export class Fighting extends State{
    constructor(player){
        super(player);
        this.state = 'FIGHTING';
        this.maxFrame = 9;
        this.frameInterval = 50;
    }

    enter(deltaTime){
        this.player.frameY = 4;
        super.enter(deltaTime);
    }

    handleInput(input, deltaTime){
        if(input.keys.fight.pressed){
            this.enter(deltaTime);
        }else{
            this.player.frameX = 0;
            this.player.changeState(states.STANDING);
        }
    }
}

export class Running extends State{
    constructor(player){
        super(player);
        this.state = 'RUNNING';
        this.maxFrame = 9;
        this.frameInterval = 50;
    }

    enter(deltaTime){
        this.player.frameY = 0;
        super.enter(deltaTime);
    }

    handleInput(input, deltaTime){
        if(
            (input.keys.right.pressed || input.keys.left.pressed) && !input.keys.fight.pressed){
            this.enter(deltaTime);
        }else if(input.keys.fight.pressed){
            this.player.frameX = 0;
            this.player.changeState(states.FIGHTING);
        }else{
            this.player.frameX = 0;
            this.player.changeState(states.STANDING);
        }
    }
}

export class Dizzy extends State{
    constructor(player){
        super(player);
        this.state = 'DIZZY';
        this.maxFrame = 9;
        this.frameInterval = 300;
    }

    enter(deltaTime){
        this.player.frameY = 9;
        this.frameTimer += deltaTime;
        if(this.frameTimer > this.frameInterval){
            this.player.frameX++;
            if(this.player.frameX > this.maxFrame){
                this.player.x -= 150;
                this.player.changeState(states.STANDING);
            }
            this.frameTimer = 0;
        }
    }

    handleInput(input, deltaTime){

    };
}

// test state
class Shooting extends State{
    constructor(player){
        super(player);
        this.state = 'SHOOTING';
        this.maxFrame = 9;
        this.frameInterval = 100;
    }

    enter(){}
}