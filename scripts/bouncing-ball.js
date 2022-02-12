const frame = document.querySelector('.frame');
const scene = document.querySelector('.scene');
const ball = document.querySelector('.ball');
// console.log(window.getComputedStyle(frame));
let mousePressed = false;
let timer;
let rotX = 0;
let rotY = 0;
let zoom = 0;
const minZoom = -50;
const maxZoom = 75;
const rotSpeed = .5;

frame.onmousedown = (e) => {
    e.preventDefault();
    mousePressed = true;
    console.log('click!', rotX, rotY);
    clearInterval(timer);
    console.log('timer cleared', rotX, rotY);
}

document.onmouseup = (e) => {
    e.preventDefault();
    mousePressed = false;
    startRotateScene();
}

frame.onmouseleave = (e) => {
    e.preventDefault();
    mousePressed = false;
    rotX = rotX - (rotX % 360);
    frame.style.fontSize = `75px`;
    // rotX = rotX % 360;
    // rotY = rotY % 360;
    // renderScene(rotX, rotY);
}

frame.onmousemove = (e) => {
    e.preventDefault();
    if (mousePressed) {

        if (e.movementY < 0) {
            deltaRotX = -1;
        } else deltaRotX = (e.movementY > 0 ? 1 : 0)
        rotX = rotX + deltaRotX * .5

        if (e.movementX < 0) {
            deltaRotY = -1;
        } else deltaRotY = (e.movementX > 0 ? 1 : 0);
        rotY = rotY + deltaRotY;

        renderScene(rotX, rotY);
        console.log(rotX, rotY);

        deltaRotX = 0;
        deltaRotY = 0;
    }
}

frame.onwheel = (e) => {
    console.log(e.deltaY);
    zoom = zoom - e.deltaY / 5;
    if (zoom < minZoom) zoom = minZoom;
    if (zoom > maxZoom) zoom = maxZoom;
    frame.style.fontSize = `${75 + zoom}px`
}

const renderScene = (rotX = 0, rotY = 0) => {
    scene.style.transform = `rotateY(${rotY}deg) rotateX(${-rotX}deg)`;
    ball.style.transform = `rotateY(${-rotY}deg) rotateX(${rotX*Math.cos(rotY * Math.PI / 180)}deg)`;
}

const startRotateScene = () => {
    timer = setInterval(() => {
        renderScene(rotX, rotY);
        // rotY = rotY >= 360 ? rotY % 360 : rotY + 1;
        rotY = rotY + rotSpeed;
        console.log(rotX, rotY);
    }, 30);
}

startRotateScene();

