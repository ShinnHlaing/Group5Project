export function drawLife(context, life){
    const image = document.getElementById('life');
    const width = 30;
    const height = 30;
    context.font = '30px Impact';
    context.fillStyle = 'white';
    context.fillText("  x  " + life, 60, 55);
    context.drawImage(
        image, 30, 30, width, height
    );
}

export function drawScore(context, score){
    context.font = '30px Impact';
    context.fillStyle = 'white';
    context.fillText("Miles : " + score, 720 , 55);
}

export function drawText(context, message, color){
    context.font = '60px Impact';
    context.fillStyle = color;
    context.fillText(message, 320 , 180);
}