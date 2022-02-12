const frame = document.querySelector('.frame');
const scene = document.querySelector('.scene');
const ball = document.querySelector('.ball');
let currentRotateX = 0;
let currentRotateY = 0;
// console.log(window.getComputedStyle(frame));
let mousePressed = false;
let timer;
let rotX = 0;
let rotY = 0;

// const el = $(".card");
// $("#top").on("mousemove", function (e) {
//     const rotY = -($(window).innerWidth() / 2 - e.pageX) / 8,
//         rotX = ($(window).innerHeight() / 2 - e.pageY) / 8  - 20;
//     el.attr("style", "transform: rotateY(" + rotY + "deg) rotateX(" + rotX + "deg);-webkit-transform: rotateY(" + rotY + "deg) rotateX(" + rotX + "deg);-moz-transform: rotateY(" + rotY + "deg) rotateX(" + rotX + "deg)");
// });

frame.onmousedown = () => {
    mousePressed = true;
}

frame.onmouseup = () => {
    mousePressed = false;
}

frame.onmouseleave = () => {
    mousePressed = false;
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

        console.log(rotX, rotY);
        scene.style.transform = `rotateY(${rotY}deg) rotateX(${-rotX}deg)`;
        ball.style.transform = `rotateY(${-rotY}deg) rotateX(${rotX*Math.cos(rotY * Math.PI / 180)}deg)`;
  
        deltaRotX = 0;
        deltaRotY = 0;
    }
}

// scene.onmousemove = (e) => {
//     rotY = -(900 / 2 - e.offsetX) / 8;
//     rotX = -(650 / 2 - e.offsetY) / 8;
//     console.log(rotX, rotY);
//     scene.setAttribute("style", "transform: rotateY(" + rotY + "deg) rotateX(" + rotX + "deg);");
// }


// frame.onmousemove = (e) => {
//     if (mousePressed) {
//         if (e.movementY < 0) {
//             deltaRotateX = -1;
//         } else deltaRotateX = (e.movementY > 0 ? 1 : 0)
//         currentRotateX = currentRotateX - deltaRotateX;
//         scene.style.transform = scene.style.transform + `rotateX(${currentRotateX}deg)`;
//         ball.style.transform = `rotateX(${-currentRotateX}deg)`;
//         stopRotateScene();
//     }
// }

// const stopRotateScene = () => {
//     clearInterval(timer);
// }

// const startRotateScene = (startAngle = 0) => {
//     timer = setInterval(() => {
//         currentRotateY = currentRotateY + 1;
//         scene.style.transform = `rotateY(${currentRotateY}deg)`;
//         ball.style.transform = `rotateY(${-currentRotateY}deg)`;
//     }, 30);
// }

// startRotateScene();

