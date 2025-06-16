const canvas = document.getElementById('game_canvas');
const ctx = canvas.getContext('2d');

const img_idle = new Image();
img_idle.src = 'assets/idle.png'; // Path to the idle image




let number_dec = Math.floor(Math.random() * 255) + 1; // Random number between 1 and 255

const cursor = {
    x: 0,
    y: 0
}

canvas.addEventListener('click', (event) => {
    if (event.offsetX >= 1030 && event.offsetX <= 1150 && event.offsetY >= 730 && event.offsetY <= 780) {
        number_dec = Math.floor(Math.random() * 255) + 1; // Change the number when button is clicked
        drawUI();
    }
});
canvas.addEventListener('mousemove', (event) => {
    if (event.offsetX >= 1030 && event.offsetX <= 1150 && event.offsetY >= 730 && event.offsetY <= 780) 
        canvas.style.cursor = 'pointer'; // Change cursor to pointer when hovering over the button
    else 
        canvas.style.cursor = 'default'; // Change cursor back to default
});

function drawUI() {

    ctx.font = "42px Arial";
    ctx.fillStyle = "#FFD38D";
    ctx.fillText("Liczba dziesietna do przestawienia binarnego: " + number_dec, 30, 770);

    ctx.fillStyle = "brown";
    ctx.fillRect(1030, 730, 140, 50);
    ctx.font = "28px Arial";
    ctx.fillStyle = "#FFD38D";
    ctx.fillText("Change!", 1045, 765);
}


class Character {
    constructor({ img, pos }) {
        this.img = img; // Image of the character
        this.pos = pos; // Position of the character
        this.frame = 0; // Current frame of the animation
        this.maxframes = 10; // Total frames in the animation
        this.state = 'idle'; // Current state of the character'
    }

    draw() {
        ctx.drawImage(this.img, this.frame * 165, 0, 165, 200, this.pos.x, this.pos.y, 165, 200); // Draw the idle image

        if(this.frame < this.maxframes) 
            this.frame++;
        else 
            this.frame = 0; 
    }
}
const racoon = new Character({
    img: img_idle,
    pos: { x: 500, y: 485 }
});
function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawUI();

    racoon.draw(); // Draw the racoon character

    requestAnimationFrame(animate); // Call animate again for the next frame
}

animate(); // Start the animation loop