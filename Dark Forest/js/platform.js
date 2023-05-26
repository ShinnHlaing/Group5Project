class Platform{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    draw(context){
        context.drawImage(
            this.image,
            this.x, this.y,
            this.width, this.height
        )
    }
}

export class BasePlatform extends Platform{
    constructor(gameWidth, gameHeight, x){
        super(gameWidth, gameHeight);
        this.x = x;
        this.image = document.getElementById('basePlatform');
        this.width = this.image.width * .8;
        this.height = this.image.height * .8;
        this.y = this.gameHeight - this.height;
    }
}

export class SmallPlatform extends Platform{
    constructor(gameWidth, gameHeight, x){
        super(gameWidth, gameHeight);
        this.x = x;
        this.image = document.getElementById('smallTallPlatform');
        this.width = this.image.width * .7;
        this.height = this.image.height * .7;
        this.y = (this.gameHeight - this.height) + (Math.random() * 200 - 100);
    }
}