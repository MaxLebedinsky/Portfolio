const frame = document.querySelector('.frame');
const scene = document.querySelector('.scene');
const cube = document.querySelector('.cube');
const ball = document.querySelector('.ball');
const ballShadow = document.querySelector('.ball-shadow');
const stopBtn = document.getElementById('stop');
const startBtn = document.getElementById('start');
const stopRotBtn = document.getElementById('stop-rotation');
const startRotBtn = document.getElementById('start-rotation');

let mousePressed = false;
let shiftPressed = false;
let rotationPaused = false;
let timer;
let rotX = 0;
let rotY = 0;
let zoom = 0;
let gradStartX = .5;
let gradStartY = 0;
let dX = 0;
let dZ = 0;
const minZoom = -50;
const maxZoom = 75;
const rotSpeed = .5;

frame.onmousedown = (e) => {
    e.preventDefault();
    mousePressed = true;
    if (e.shiftKey) {
        shiftPressed = true;
    }
}

document.onmouseup = () => {
    mousePressed = false;
    shiftPressed = false;
}

frame.onmouseleave = () => {
    normalizeRotX();
}

const normalizeRotX = () => {
    rotX = rotX - (rotX % 360);
    dX = 0;
    dZ = 0;
    renderScene(rotX, rotY, 0.5, 0, 0, 0);
    frame.style.fontSize = `75px`;
}

frame.onmousemove = (e) => {
    e.preventDefault();
    
    if (mousePressed) {

        if (e.movementY < 0) {
            deltaRotX = -1;
        } else deltaRotX = (e.movementY > 0 ? 1 : 0)
       
        if (rotX > 90) { rotX = 90 }
        if(rotX < -90) { rotX = -90 }

        if (e.movementX < 0) {
            deltaRotY = -1;
        } else deltaRotY = (e.movementX > 0 ? 1 : 0);

        if (shiftPressed) {
            dX = dX + deltaRotY * 0.1;
            dZ = dZ + deltaRotX * 0.1;
        } else {
            
            rotX = rotX + deltaRotX * .7;
            rotY = rotY + deltaRotY * 1.3;
    
            gradStartY = Math.cos(rotY * Math.PI / 180) / 2 * Math.sin(rotX * Math.PI / 180);
        }

        renderScene(rotX, rotY, gradStartX, gradStartY, dX, dZ);

        deltaRotX = 0;
        deltaRotY = 0;
    }
}

frame.onwheel = (e) => {
    zoom = zoom - e.deltaY / 5;
    if (zoom < minZoom) zoom = minZoom;
    if (zoom > maxZoom) zoom = maxZoom;
    frame.style.fontSize = `${75 + zoom}px`
}

stopBtn.onmousedown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    ball.style.animationPlayState = 'paused';
    ballShadow.style.animationPlayState = 'paused';
    cube.style.animationPlayState = 'paused';
    startBtn.classList.remove('disabled');
    stopBtn.classList.add('disabled');
}

startBtn.onmousedown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    ball.style.animationPlayState = 'running';
    ballShadow.style.animationPlayState = 'running';
    cube.style.animationPlayState = 'running';
    startBtn.classList.add('disabled');
    stopBtn.classList.remove('disabled');
}

stopRotBtn.onmousedown = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
    if (rotationPaused) {
        startRotateScene();
    }
    rotationPaused = false;
    startRotBtn.classList.add('disabled');
    stopRotBtn.classList.remove('disabled');
}

startRotBtn.onmouseup = (e) => { e.stopPropagation() }
stopRotBtn.onmouseup = (e) => { e.stopPropagation() }
startBtn.onmouseup = (e) => { e.stopPropagation() }
stopBtn.onmouseup = (e) => { e.stopPropagation() }

const renderScene = (rotX = 0, rotY = 0, gradStartX = 0.5, gradStartY = 0, dX = 0, dZ = 0) => {
    scene.style.transform = `rotateY(${rotY}deg) rotateX(${-rotX}deg)
    translateX(${dX}em) translateZ(${dZ}em)`;

    ball.style.transform = `rotateY(${-rotY}deg) rotateX(${rotX * Math.cos(rotY * Math.PI / 180)}deg)`;
    
    ball.style.backgroundImage = `radial-gradient(circle at ${gradStartX}em ${gradStartY}em, lightblue, #000)`;
}

const startRotateScene = () => {
    timer = setInterval(() => {
        renderScene(rotX, rotY, gradStartX, gradStartY, dX, dZ);
        rotY = rotY + rotSpeed;
    }, 30);
}

startRotateScene();

