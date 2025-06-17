const canvas = document.getElementById('game_canvas');
const ctx = canvas.getContext('2d');

const img_bg = new Image();
img_bg.src = 'assets/background.png'; // Path to the background image

const img_idle = new Image();
img_idle.src = 'assets/idle.png'; // Path to the idle image

const img_walk_l = new Image();
img_walk_l.src = 'assets/walk_l.png';

const img_walk_r = new Image();
img_walk_r.src = 'assets/walk_r.png';

const img_on = new Image();
img_on.src = 'assets/on.png';
const img_off = new Image();
img_off.src = 'assets/off.png';

let doubleFrame = false;

///////////////////////////////////////////////

let number_dec = Math.floor(Math.random() * 255) + 1; // Random number between 1 and 255

function checkWin() {
    let current_dec_value = 0;
    for (let i = 0; i < buttons.length; i++) 
        current_dec_value += buttons[i].value * Math.pow(2, 7 - i);

    if (current_dec_value === number_dec) {
        ctx.fillStyle = "#32140F";
        ctx.fillRect(300, 20, 630, 70);
        ctx.fillStyle = "#FFD38D";
        ctx.font = "48px Arial";
        ctx.fillText("Gratulacje! Wygra³eœ!", 330, 70);
    }
}

///////////////////////////////////////////////

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

///////////////////////////////////////////////

const key = {
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
    ArrowUp: { pressed: false }
}

let current_key = '';

window.addEventListener('keydown', (event) => {
    if(event.key == 'ArrowLeft') {
        key.ArrowLeft.pressed = true; // Set left arrow key pressed
        current_key = 'ArrowLeft'; // Set current key to left arrow
    }
    if(event.key == 'ArrowRight') {
        key.ArrowRight.pressed = true; // Set right arrow key pressed
        current_key = 'ArrowRight'; // Set current key to right arrow
    }
    if (event.key == 'ArrowUp') {
        key.ArrowUp.pressed = true; // Set right arrow key pressed
        current_key = 'ArrowUp'; // Set current key to right arrow
    }
});
window.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') {
        key.ArrowLeft.pressed = false; // Set left arrow key pressed
        racoon.state = 'idle'; // Change state to idle when left arrow is released
    }
    if (event.key === 'ArrowRight') {
        key.ArrowRight.pressed = false; // Set right arrow key pressed
        racoon.state = 'idle'; // Change state to idle when left arrow is released
    }
    if (event.key === 'ArrowUp') {
        key.ArrowUp.pressed = false; // Set right arrow key pressed
        racoon.state = 'idle'; // Change state to idle when left arrow is released
    }
});
///////////////////////////////////////////////

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
///////////////////////////////////////////////

class Character {
    constructor({ img, pos }) {
        this.img = img; // Image of the character
        this.pos = pos; // Position of the character
        this.frame = 0; // Current frame of the animation
        this.maxframes = 10; // Total frames in the animation
        this.state = 'idle'; // Current state of the character'
        this.walk_l = false; // Walking left state
        this.walk_r = false; // Walking right state
        this.velocity = 0; // Velocity of the character
        this.weight = 1; // Weight of the character
        this.switched = false; // Flag to check if the character has switched buttons
    }

    isStanding() {
        return this.pos.y >= 485; // Check if the character is standing on the ground
    }

    jump() {
        if(key.ArrowUp.pressed && this.isStanding())
            this.velocity = -20; // Set velocity for jumping

        this.pos.y += this.velocity; // Move the character up

        if (!this.isStanding()) {
            this.velocity += this.weight; // Apply weight to the velocity
            this.switchButton(); // Check if the character is on a button
        } else {
            this.velocity = 0; // Reset velocity if standing
            this.state = 'idle'; // Change state to idle
            this.switched = false; // Reset switched flag
        }
        
    }

    switchButton() {
        for (let i = 0; i < buttons.length; i++) {
            let start = i * 150;
            let end = i * 150 + 150;

            if (this.pos.x + 80 >= start && this.pos.x + 80 <= end && this.pos.y <= 300 && !this.switched) {
                if (buttons[i].value == 0) {
                    buttons[i].value = 1; // Set button value to 1
                    buttons[i].img = img_on; // Change button image to on
                }
                else {
                    buttons[i].value = 0; // Set button value to 0 if character is on the button
                    buttons[i].img = img_off; // Change button image to on
                }
                this.switched = true; // Set switched flag to true
            }
        }
    }

    draw() {
        ctx.drawImage(this.img, this.frame * 165, 0, 165, 200, this.pos.x, this.pos.y, 165, 200); // Draw the idle image

        if (key.ArrowLeft.pressed && this.pos.x >= 0 && current_key == 'ArrowLeft') {
            this.pos.x -= 8;
            this.state = 'walk_l'; // Change state to walking left
        }
        else if (key.ArrowRight.pressed && this.pos.x <= 1035 && current_key == 'ArrowRight') {
            this.pos.x += 8;
            this.state = 'walk_r'; // Change state to walking right
        }
        else if (key.ArrowUp.pressed && current_key == 'ArrowUp') {
            this.state = 'jump'; // Change state to jump
        }

        if (this.state == 'idle') 
            this.img = img_idle; // Set image to idle
        else if (this.state == 'walk_l') 
            this.img = img_walk_l; // Set image to walking left
        else if (this.state == 'walk_r') 
            this.img = img_walk_r; // Set image to walking right


        if (this.frame < this.maxframes) {
            if (!doubleFrame) {
                doubleFrame = true;
            }
            else {
                doubleFrame = false;
                this.frame++;
            }
        }  
        else 
            this.frame = 0; 

        this.jump(); // Call the jump method
    }
}
const racoon = new Character({
    img: img_idle,
    pos: { x: 500, y: 485 }
});
///////////////////////////////////////////////

class Button {
    constructor({ img, pos, nr }) {
        this.img = img; // Image of the button
        this.pos = pos; // Position of the button
        this.nr = nr; // Number associated with the button
        this.value = 0; // Value of the button
    }

    draw() {
        ctx.drawImage(this.img, this.nr * 150, 110);
    }
}

let buttons = [];

for (let i = 0; i < 8; i++) {
    buttons.push(
        new Button({
            img: img_off,
            pos: { x: 150, y: 0 },
            nr: i
        })
    );
}

///////////////////////////////////////////////
function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img_bg, 0, 0, canvas.width, canvas.height); // Draw the background image

    drawUI();

    for (let i = 0; i < 8; i++) {
        buttons[i].draw(); // Draw each button
    }


    racoon.draw(); // Draw the racoon character

    checkWin(); // Check if the player has won

    requestAnimationFrame(animate); // Call animate again for the next frame
}

animate(); // Start the animation loop