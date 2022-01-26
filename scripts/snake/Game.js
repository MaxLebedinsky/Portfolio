class Game {
    constructor() {
        this.tickIdentifier = null;
        this.messageEl = document.getElementById('message');
        this.scoreEl = document.getElementById('score-value');
        this.godModeEl = document.getElementById('god-mode-checkbox');
        this.speedEl = document.getElementById('speed-select');
        this.lengthEl = document.getElementById('length-select');
        this.speedDisplayEl = document.getElementById('speed-display');
        this.lengthDisplayEl = document.getElementById('length-display');
    }

    /** 
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings 
     * @param {Status} status
     * @param {Board} board
     * @param {Snake} snake
     * @param {Menu} menu
     * @param {Food} food
     */
    init(settings, status, board, snake, menu, food) {
        this.settings = settings;
        this.status = status;
        this.board = board;
        this.snake = snake;
        this.menu = menu;
        this.food = food;
        this.scoreValue = 0;
        this.godMode = this.godModeEl.checked;
        this.speedDisplayEl.innerHTML = `${this.speedEl.value}`;
        this.speedEl.addEventListener('change', (e) => {
            this.speedDisplayEl.innerHTML = `${e.target.value}`;
        });
        this.lengthDisplayEl.innerHTML = `${this.lengthEl.value}`;
        this.lengthEl.addEventListener('change', (e) => {
            this.lengthDisplayEl.innerHTML = `${e.target.value}`;
        })
    }

    /**
     * Метод назначает обработчики на события клика на кнопки "Старт",
     * "Пауза", а также на стрелки на клавиатуре.
     */
    run() {
        this.menu.addButtonsClickListeners(this.start.bind(this), this.pause.bind(this));
        document.addEventListener('keydown', this.pressKeyHandler.bind(this));
    }

    /**
     * Метод запускает игру.
     */
    start() {
        if (this.status.isPaused()) {
            this.godMode = this.godModeEl.checked;
            this.status.setPlaying();
            this.settings.init({ speed: this.speedEl.value * 3, winLength: this.lengthEl.value * 1});
            console.log('speed: ', this.settings.speed);
            console.log('length: ', this.settings.winLength);
            this.tickIdentifier = setInterval(this.doTick.bind(this), 1000 / this.settings.speed);
        }
        // если проиграли или выиграли и нажали старт, перезапускаем игру
        if (this.isGameLost() || this.isGameWon()) this.restart();
    }

    restart() {
        console.log('restart');
        this.setMessage('');
        this.status.setPlaying();
        this.settings.init({ speed: this.speedEl.value * 3, winLength: this.lengthEl.value * 1});
        console.log('speed: ', this.settings.speed);
        console.log('length: ', this.settings.winLength);
        this.board.init(this.settings, this.snake);
        this.food.init(this.settings, this.snake, this.board);
        this.init(this.settings, this.status, this.board, this.snake, this.menu, this.food);
        this.board.renderBoard();
        this.snake.body = [{
            x: 1,
            y: 1,
        }];
        this.snake.direction = 'down';
        this.board.renderSnake();
        this.food.setNewFood();
        this.tickIdentifier = setInterval(this.doTick.bind(this), 1000 / this.settings.speed);
    }

    /**
     * Метод ставит игру на паузу.
     */
    pause() {
        if (this.status.isPlaying()) {
            this.status.setPaused();
            clearInterval(this.tickIdentifier);
        }
    }

    /**
     * Этот метод запускается каждую секунду и осуществляет:
     * 1. перемещение змейки
     * 2. проверяет проиграна/выиграна ли игра
     * 3. увеличивает размер змейки если она ест еду
     * 4. заново отрисовывает положение змейки и еды
     */
    doTick() {
        this.snake.performStep();
        if (this.isGameLost()) {
            return;
        }
        if (this.isGameWon()) {
            return;
        }
        
        if (this.board.isHeadOnFood()) {
            this.snake.increaseBody();
            this.scoreValue++;
            if (!this.isGameWon()) this.food.setNewFood();
        }
        
        if (!this.isGameWon()) {
            this.board.clearBoard();
            this.food.setFood();
            this.board.renderSnake();
        }
        this.scoreEl.innerHTML = `${this.scoreValue}`;
    }

    /**
     * Метод проверяет выиграна ли игра, останавливает игру,
     * выводит сообщение о выигрыше.
     * @returns {boolean} если длина змейки достигла длины нужной
     * для выигрыша, тогда true, иначе false.
     */
    isGameWon() {
        if (this.snake.body.length == this.settings.winLength + 1) {
            clearInterval(this.tickIdentifier);
            this.setMessage('You won!');
            return true;
        }
        return false;
    }

    /**
     * Метод проверяет проиграна ли игра, останавливает игру
     * в случае проигрыша, выводит сообщение о проигрыше.
     * @returns {boolean} если мы шагнули в стену, тогда
     * true, иначе false.
     */
    isGameLost() {
        if (this.board.isNextStepToWall(this.snake.body[0])) {

            // если дошли до стены, то в зависимости от godMode либо прерываем игру, 
            // либо переписываем координаты головы т тграем дальше
            if (!this.godMode) {
                clearInterval(this.tickIdentifier); 
                this.setMessage('You lost');
                return true;
            } else {

                let head = this.snake.body[0];

                switch (this.snake.direction) {
                    case "down":
                        head.y = 1;
                        break;
                    case "up":
                        head.y = this.settings.rowsCount;
                        break;
                    case "left":
                        head.x = this.settings.colsCount;
                        break;
                    case "right":
                        head.x = 1;
                        break;
                }
                return false;
            }
        }
        return false;
    }

    /**
     * В зависимости от нажатой кнопки (вверх, вниз, влево, вправо) будет 
     * вызываться соответствующий метод.
     * @param {KeyboardEvent} event 
     */
    pressKeyHandler(event) {
        switch (event.key) {
            case "ArrowUp":
                this.snake.changeDirection('up');
                break;
            case "ArrowDown":
                this.snake.changeDirection('down');
                break;
            case "ArrowLeft":
                this.snake.changeDirection('left');
                break;
            case "ArrowRight":
                this.snake.changeDirection('right');
                break;
        }
    }

    /**
     * Метод выводит сообщение на странице.
     * @param {string} text 
     */
    setMessage(text) {
        this.messageEl.innerText = text;
    }
}