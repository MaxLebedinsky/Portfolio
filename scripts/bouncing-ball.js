const frame = document.querySelector('.frame');
const scene = document.querySelector('.scene');
const cube = document.querySelector('.cube');
const ball = document.querySelector('.ball');
const ballShadow = document.querySelector('.ball-shadow');
const stopBtn = document.getElementById('stop');
const startBtn = document.getElementById('start');
const stopRotBtn = document.getElementById('stop-rotation');
const startRotBtn = document.getElementById('start-rotation');
// console.log(window.getComputedStyle(frame));
let mousePressed = false;
let rotationPaused = false;
let timer;
let rotX = 0;
let rotY = 0;
let zoom = 0;
const minZoom = -50;
const maxZoom = 75;
const rotSpeed = .5;

frame.onmousedown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('onFrameMouseDOWN');
}

document.onmouseup = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('onDocMouseUP');
}

frame.onmouseleave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('onFrameLEAVE');

}

const normalizeRotX = () => {
    rotX = rotX - (rotX % 360);
    renderScene(rotX, rotY);
    frame.style.fontSize = `75px`;
}

frame.onmousemove = (e) => {
    e.preventDefault();
    
    if (mousePressed) {

        console.log('onmouseMove & mousePressed');

        if (e.movementY < 0) {
            deltaRotX = -1;
        } else deltaRotX = (e.movementY > 0 ? 1 : 0)
        rotX = rotX + deltaRotX * .5

        if (e.movementX < 0) {
            deltaRotY = -1;
        } else deltaRotY = (e.movementX > 0 ? 1 : 0);
        rotY = rotY + deltaRotY;

        renderScene(rotX, rotY);

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

stopBtn.onmousedown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('stopBounceBtn');
    ball.style.animationPlayState = 'paused';
    ballShadow.style.animationPlayState = 'paused';
    cube.style.animationPlayState = 'paused';
    startBtn.classList.remove('disabled');
    stopBtn.classList.add('disabled');
}

startBtn.onmousedown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('startBounceBtn');
    ball.style.animationPlayState = 'running';
    ballShadow.style.animationPlayState = 'running';
    cube.style.animationPlayState = 'running';
    startBtn.classList.add('disabled');
    stopBtn.classList.remove('disabled');
}

stopRotBtn.onmousedown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('stopRotBtn');
    if (!rotationPaused) {
        clearInterval(timer);
    }
    rotationPaused = true;
    startRotBtn.classList.remove('disabled');
    stopRotBtn.classList.add('disabled');
}

startRotBtn.onmousedown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('startRotBtn');
    if (rotationPaused) {
        startRotateScene();
    }
    rotationPaused = false;
    startRotBtn.classList.add('disabled');
    stopRotBtn.classList.remove('disabled');
}

startBtn.onmouseup = (e) => { e.stopPropagation() }
stopBtn.onmouseup = (e) => { e.stopPropagation() }
startRotBtn.onmouseup = (e) => { e.stopPropagation() }
stopRotBtn.onmouseup = (e) => { e.stopPropagation() }

const renderScene = (rotX = 0, rotY = 0) => {
    scene.style.transform = `rotateY(${rotY}deg) rotateX(${-rotX}deg)`;
    ball.style.transform = `rotateY(${-rotY}deg) rotateX(${rotX*Math.cos(rotY * Math.PI / 180)}deg)`;
}

const startRotateScene = () => {
    timer = setInterval(() => {
        renderScene(rotX, rotY);
        rotY = rotY + rotSpeed;
    }, 30);
}

startRotateScene();

