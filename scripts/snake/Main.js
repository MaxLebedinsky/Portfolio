window.addEventListener('load', () => {
    const settings = new Settings();
    const status = new Status();
    const snake = new Snake();
    const board = new Board();
    const menu = new Menu();
    const food = new Food();
    const game = new Game();

    game.lengthEl.value = 7;
    settings.init({ speed: game.speedEl.value * 3, winLength: game.lengthEl.value * 1});
    console.log('speed: ', game.speedEl.value * 3);
    console.log('length: ', game.lengthEl.value * 1);
    board.init(settings, snake);
    food.init(settings, snake, board);
    status.setPaused();
    game.scoreEl.innerHTML = ('0');
    game.init(settings, status, board, snake, menu, food);

    board.renderBoard();
    board.renderSnake();

    food.setNewFood();
    game.run();
});
