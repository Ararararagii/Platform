const canvas = document.getElementById('game_canvas');
const ctx = canvas.getContext('2d');

let number_dec = Math.floor(Math.random() * 255) + 1; // Random number between 1 and 255

const cursor = {
    x: 0,
    y: 0
}

canvas.addEventListener('click', (event) => {
    cursor.x = event.offsetX;
    cursor.y = event.offsetY;

    if (cursor.x >= 1030 && cursor.x <= 1150 && cursor.y >= 730 && cursor.y <= 780) {
        number_dec = Math.floor(Math.random() * 255) + 1; // Change the number when button is clicked
        showUI();
    }
});

function showUI() {
    ctx.font = "42px Arial";
    ctx.fillStyle = "#FFD38D";
    ctx.fillText("Liczba dziesietna do przestawienia binarnego: " + number_dec, 30, 770);

    ctx.fillStyle = "brown";
    ctx.fillRect(1030, 730, 120, 50);
    ctx.font = "28px Arial";
    ctx.fillStyle = "#FFD38D";
    ctx.fillText("Change!", 1045, 765);
}

ctx.clearRect(0, 0, canvas.width, canvas.height);
showUI();