export default class InputHandler {
    constructor() {
        this.keys = {
            top: { pressed: false },
            bottom: { pressed: false },
            left: { pressed: false },
            right: { pressed: false },
            fight: { pressed: false }
        }
        window.addEventListener('keydown', ({ keyCode }) => {
            switch (keyCode) {
                case 68:
                    //right
                    this.keys.right.pressed = true;
                    break;

                case 65:
                    //left
                    this.keys.left.pressed = true;
                    break;

                case 83:
                    //bottom
                    this.keys.bottom.pressed = true;
                    break;

                case 87:
                    //top
                    this.keys.top.pressed = true;
                    break;

                case 70:
                    //fight F
                    this.keys.fight.pressed = true;
                    break;
            }
        });
        window.addEventListener('keyup', ({ keyCode }) => {
            switch (keyCode) {
                case 68:
                    //right
                    this.keys.right.pressed = false;
                    break;

                case 65:
                    //left
                    this.keys.left.pressed = false;
                    break;

                case 83:
                    //bottom
                    this.keys.bottom.pressed = false;
                    break;

                case 87:
                    //top
                    this.keys.top.pressed = false;
                    break;

                case 70:
                    //fight
                    this.keys.fight.pressed = false;
                    break;
            }
        });
    }
}