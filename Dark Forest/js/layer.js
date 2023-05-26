class Layer{
    constructor(speedModifier){
        this.speedModifier = speedModifier;
        this.playerSpeed = 5;
        this.speed = this.playerSpeed * this.speedModifier;
    }

    update(){
        if(this.x < -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        if(this.x2 < -this.width){
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x-this.speed);
        this.x2 = Math.floor(this.x2-this.speed);
    }

    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

export class Layer1 extends Layer{
    constructor(speedModifier){
        super(speedModifier)
        this.image = document.getElementById('layer1');
        this.width = this.image.width;
        this.height = this.image.height;
        this.x = 0;
        this.y = 0;
        this.x2 = this.width;
    }
}

export class Layer3 extends Layer{
    constructor(speedModifier){
        super(speedModifier)
        this.image = document.getElementById('layer3');
        this.width = this.image.width;
        this.height = this.image.height;
        this.x = 0;
        this.y = 0;
        this.x2 = this.width;
    }
}

export class Layer4 extends Layer{
    constructor(speedModifier){
        super(speedModifier)
        this.image = document.getElementById('layer4');
        this.width = this.image.width;
        this.height = this.image.height;
        this.x = 0;
        this.y = 0;
        this.x2 = this.width;
    }
}