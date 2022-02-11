const board = document.querySelector('.board');
const display = document.querySelector('.display');
const valX = document.getElementById('valX');
const valY = document.getElementById('valY');
const valMovementX = document.getElementById('valMovementX');
const valMovementY = document.getElementById('valMovementY');

let pressed = false;

// board.onmousedown = (e) => {console.log('down')}
// board.onmouseup = (e) => {console.log('up')}

const clearValues = () => {
    valX.innerHTML = '0';
    valY.innerHTML = '0';
    valMovementX.innerHTML = '0';
    valMovementY.innerHTML = '0';
}

board.onmousedown = (e) => {
    pressed = true;
}

board.onmouseup = (e) => {
    pressed = false;
    clearValues();
}

board.onmousemove = (e) => {
    if (pressed) {
        valX.innerHTML = e.offsetX;
        valY.innerHTML = e.offsetY;
        valMovementX.innerHTML = e.movementX;
        valMovementY.innerHTML = e.movementY;
    }
}

// board.onmouseleave = (e) => {
//     clearValues();
// }