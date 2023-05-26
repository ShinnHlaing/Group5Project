import Player from "./player.js";
import InputHandler from "./input.js";
import { BasePlatform, SmallPlatform } from "./platform.js";
import { Ghost, Plant, Spider} from "./enemy.js";
import { Layer1, Layer3, Layer4 } from "./layer.js";
import { drawLife , drawScore} from "./drawMessage.js";

export default class Game{
    constructor(width, height, ctx){
        this.width = width;
        this.height = height;
        this.context = ctx;
        this.gameWin = false;
        this.gameOver = false;
        this.gameFinish = false;
        this.input = new InputHandler();
        this.player = new Player(this);
        this.layers = [new Layer1(.4), new Layer3(.6), new Layer4(.8)];
        this.platforms = [];
        this.enemyTypes = ['ghost','plant','spider'];
        this.enemies = [];
        this.explosions = [];
        this.#addPlatforms();
        this.#addEnemies();
        this.winningScore = 5000;
        this.winAudio = new Audio();
        this.winAudio.src = '../audio/gameWin.mp3';
        this.loseAudio = new Audio();
        this.loseAudio.src = '../audio/mixkit-sad-game-over.wav';
    }

    update(deltaTime){
        //game finish
        if(this.player.score >= this.winningScore){
            this.gameWin = true;
            this.gameFinish = true;
            this.winAudio.play();
        }else if(this.player.life <= 0){
            this.gameOver = true;
            this.gameFinish = true;
            this.loseAudio.play();
        }

        //player
        this.player.update(this.input, deltaTime);

        //enemies, explosions
        [...this.enemies,...this.explosions].forEach( obj => {
            obj.update(deltaTime);
        });

        //remove enemies, explosions
        this.enemies = this.enemies.filter( enemy => !enemy.markForDeletion);
        this.explosions = this.explosions.filter( explosion => !explosion.markedForDeletion);
    }

    draw(){
        //layers
        [...this.layers,...this.platforms,
            ...this.enemies,...this.explosions].forEach( obj => {
            obj.draw(this.context);
        });

        //score and life
        drawLife(this.context, this.player.life);
        drawScore(this.context, this.player.score);

        //player
        this.player.draw();
    }

    #addPlatforms(){
        const basePlatformWidth = 580 * .8;
        const smallPlatformWidth = 291 * .7;
        const platformGap = 650;
        for (let i = 0; i < 20; i++) {
            const basePlatformX = (basePlatformWidth + platformGap) * i;
            const smallTallPlatformX = (basePlatformX + basePlatformWidth) + (platformGap - smallPlatformWidth) / 2;
            this.platforms.push(
                new BasePlatform(this.width, this.height, basePlatformX),
                new SmallPlatform(this.width, this.height, smallTallPlatformX)
            );
        }
    }

    #addEnemies(){
        const enemyPlantWidth = 60;
        const enemyPlantHeight = 87;
        const enemyGhostHeight = 209 * .4;
        this.platforms.forEach( (platform,index) => {
            if(index % 2 === 0){
                const plantX = platform.x + (platform.width - enemyPlantWidth) / 2;
                const plantY = platform.y - enemyPlantHeight;
                const ghostX = platform.x + platform.width;
                const ghostY = platform.y - enemyGhostHeight; 
                const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
                if(randomEnemy === 'ghost'){
                    this.enemies.push(new Ghost(this.width, this.height, this.player, ghostX, ghostY));
                }else if(randomEnemy === 'plant'){
                    this.enemies.push(new Plant(this.width, this.height, plantX, plantY));
                }else if(randomEnemy === 'spider'){
                    this.enemies.push(new Spider(this.width, this.height, this.player, plantX));
                }
            }
        } )
    }
}