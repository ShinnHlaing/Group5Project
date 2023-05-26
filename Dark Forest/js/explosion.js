export default class Explosion{
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.image = document.getElementById('boom');
        this.maxFrame = 4;
        this.frame = 0;
        this.frameInterval = 100;
        this.timeToNextFrame = 0;
        this.audio = new Audio();
        this.audio.src = '../audio/Tite mi.wav';
        this.markedForDeletion = false;
    }

    update(deltaTime){
        this.timeToNextFrame += deltaTime;
        if(this.frame === 0){
            this.audio.play();
        }
        if(this.timeToNextFrame > this.frameInterval){
            this.frame++;
            if(this.frame > this.maxFrame){
                this.markedForDeletion = true;
            }
            this.timeToNextFrame = 0;
        }
    }

    draw(context){
        context.drawImage(
            this.image,
            this.spriteWidth * this.frame, 0,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y,
            this.size, this.size
        )
    }

}