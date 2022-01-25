window.addEventListener('load', () => {
    const settings = new Settings();
    const status = new Status();
    const snake = new Snake();
    const board = new Board();
    const menu = new Menu();
    const food = new Food();
    const game = new Game();

    settings.init({ speed: 10, winLength: 5, godMode: false });
    board.init(settings, snake);
    food.init(settings, snake, board);
    status.setPaused();
    game.init(settings, status, board, snake, menu, food);

    board.renderBoard();
    board.renderSnake();

    food.setNewFood();
    game.run();
});
