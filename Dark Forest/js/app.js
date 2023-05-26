import Game from "./game.js";
import { drawText } from "./drawMessage.js";

window.addEventListener('load',() => {
    const startGame = document.getElementById('startGame');
    const startPage = document.getElementById('startPage');
    const gameArea = document.getElementById('gameArea');
    const restartBtn = document.getElementById('restart');
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 500;
    const introSound = new Audio();
    introSound.src = '../audio/intro.wav';
    introSound.play();

    const game = new Game(canvas.width, canvas.height, ctx);
    let lastTime = 0;
    function animate(timeStamp){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw();
        if(game.gameWin) drawText(ctx,'Game Win','green');
        else if(game.gameOver) drawText(ctx,'GameOver','red');
        if(game.gameFinish) {
            restartBtn.style.display = 'block';
            restartBtn.addEventListener('click', () => {
                window.location.reload();
            });
        }
        if(!game.gameFinish) requestAnimationFrame(animate);
    }
    
    startGame.addEventListener('click',() => {
        gameArea.style.display = 'block';
        startPage.style.display = 'none';
        requestAnimationFrame(animate);
    });
})