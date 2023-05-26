class Enemy{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.frameX = 0;
        this.timer = 0;
        this.frameInterval = 50;
    }

    draw(context){
        context.drawImage(
            this.image,
            this.spriteWidth * this.frameX , 0,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y,
            this.width, this.height
        );
    }

    update(deltaTime){
        this.timer += deltaTime;
        if(this.timer > this.frameInterval){
            this.frameX++;
            if(this.frameX > this.maxFrame) this.frameX = 0;
            this.timer = 0;
        }
    }
}

export class Plant extends Enemy{
    constructor(gameWidth, gameHeight, x, y){
        super(gameWidth, gameHeight);
        this.x = x;
        this.y = y;
        this.image = document.getElementById('enemyPlant');
        this.spriteWidth = 60;
        this.spriteHeight = 87;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.maxFrame = 1;
        this.markForDeletion = false;
    }
}

export class Ghost extends Enemy{
    constructor(gameWidth, gameHeight, player, x, y){
        super(gameWidth, gameHeight);
        this.player = player;
        this.x = x;
        this.y = y;
        this.image = document.getElementById('enemyGhost');
        this.spriteWidth = 261;
        this.spriteHeight = 209;
        this.width = this.spriteWidth * .4;
        this.height = this.spriteHeight * .4;
        this.speedX = Math.random() * 5 + 5;
        this.maxFrame = 5;
        this.markForDeletion = false;
    }

    draw(context) {
        context.save();
        context.globalAlpha = 0.6;
        super.draw(context);
        context.restore();
    }

    update(deltaTime){
        super.update(deltaTime);
        if (this.x < -this.width || this.y < -this.height) this.markForDeletion = true;
        if (this.x - this.player.x <= 400) this.x -= this.speedX;
    }
}

export class Spider extends Enemy{
    constructor(gameWidth, gameHeight, player, x){
        super(gameWidth, gameHeight);
        this.player = player;
        this.x = x;
        this.y = 0;
        this.image = document.getElementById('enemySpider');
        this.spriteWidth = 310;
        this.spriteHeight = 175;
        this.width = this.spriteWidth * .4;
        this.height = this.spriteHeight * .4;
        this.speedY = Math.random() * 4 + 6;
        this.maxDistanceY = this.gameHeight * ((Math.random() * .3) + .7);
        this.maxFrame = 5;
        this.markForDeletion = false;
    }

    draw(context) {
        super.draw(context);
        context.beginPath(); // Start a new path
        context.moveTo(this.x + (this.width / 2), 0); // Move the pen to (30, 50)
        context.lineTo(this.x + (this.width / 2), this.y); // Draw a line to (150, 100)
        context.stroke(); // Render the path
    }

    update(deltaTime){
        super.update(deltaTime);
        if(this.x - this.player.x < 200){
            this.y += this.speedY;
        }
        if (this.y + this.height > this.maxDistanceY) {
            this.speedY = -this.speedY;
        }
        if(this.y < -this.height){
            this.markForDeletion  = true;
        }
    }
}


