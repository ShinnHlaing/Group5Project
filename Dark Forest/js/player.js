import { states, Running, Fighting, Standing, Dizzy } from './state.js';
import Explosion from './explosion.js';

export default class Player{
    constructor(game){
        this.game = game;
        this.x = 50;
        this.y = 100;
        this.image = document.getElementById('player_ninja');
        this.spriteWidth = 575;
        this.spriteHeight = 523;
        this.width = this.spriteWidth * .18;
        this.height = this.spriteHeight * .18;
        this.weight = 1;
        this.dx = 0;
        this.dy = 0;
        this.speedX = 5;
        this.speedY = 23;
        this.frameX = 0;
        this.frameY = 0;
        this.states = [new Standing(this), new Running(this), new Fighting(this), new Dizzy(this)];
        this.currentState = this.states[states.STANDING];
        this.life = 5;
        this.score = 0;
        this.fallAudio = new Audio();
        this.fallAudio.src = '../audio/Pyout-Kya.wav';
    }

    draw(){
        this.game.context.drawImage(
            this.image,
            this.spriteWidth * this.frameX, this.spriteHeight * this.frameY,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y,
            this.width ,this.height
        )
    }

    update(input, deltaTime){
        //states
        this.currentState.enter(deltaTime);
        this.currentState.handleInput(input, deltaTime);
        if(this.currentState.state === 'DIZZY') return;

        //vertical movement
        this.y += this.dy;
        if(this.y + this.height + this.dy < this.game.height){
            this.dy += this.weight;
        }
        if(input.keys.top.pressed && this.onPlatform()) this.dy = -this.speedY;
        if(this.onPlatform()) this.dy = 0;
        

        //horizontal movement
        this.x += this.dx;
        if(input.keys.right.pressed && this.x + this.width <= 500){
            this.dx = this.speedX;
        }else if(input.keys.left.pressed && this.x >= 0){
            this.dx = -this.speedX;
        }else{
            this.dx = 0;
            if(input.keys.right.pressed){
                this.score++;
                [...this.game.platforms,...this.game.enemies].forEach( obj => {
                    obj.x -= this.speedX;
                });
                this.game.layers.forEach( layer => {
                    layer.update();
                })
            }
        }
        if(this.x < 0) this.x = 0;

        //falling from platforms
        if(this.y >= this.game.height + 500){
            this.fallAudio.play();
            this.x -= 160;
            this.y = 100;
            this.life -= 1;
        }

        //collision
        [...this.game.enemies].forEach( enemy => {
            if(
                this.x + this.width >= enemy.x &&
                this.x <= enemy.x + enemy.width &&
                this.y + this.height >= enemy.y &&
                this.y <= enemy.y + enemy.height
            ){
                if(this.currentState.state === 'FIGHTING'){
                    enemy.markForDeletion = true;
                    this.game.explosions.push(new Explosion(enemy.x, enemy.y, enemy.width));
                }else{
                    this.life -= 1;
                    this.frameX = 0;
                    this.fallAudio.play();
                    this.changeState(states.DIZZY);
                }
            }
        })

    }

    onPlatform(){
        return this.game.platforms.some( platform => {
            return this.y + this.height <= platform.y &&
            this.y + this.height + this.dy >= platform.y &&
            this.x + this.width >= platform.x &&
            this.x <= platform.x + platform.width;
        });
    }

    changeState(state){
        this.currentState = this.states[state];
    }
}