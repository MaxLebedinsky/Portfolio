const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const colors = ['#316B83', '#8CA1A5', '#31836f', '#314e83', '#6e5643',
'#3c7a29', '#833164'];
let time = 0;
let score = 0;
let timer;
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    timeEl.parentNode.classList.remove('hide');
    timer = setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value>=10?value:'0'+value}`;
}

function finishGame() {
    clearInterval(timer);
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h2>Score: <span class="primary">${score}
    </span></h2>
    <a href="#" id="restart">Restart</a>`
    const restartBtn = document.getElementById('restart');
    restartBtn.addEventListener('click', () => {
        screens.forEach(screen => screen.classList.remove('up'));
        board.innerHTML = '';
        score = 0;
    });
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    setColor(circle);
    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function setColor(element) {
    const color = getRandomColor();
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}