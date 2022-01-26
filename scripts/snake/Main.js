window.addEventListener('load', () => {
    const settings = new Settings();
    const status = new Status();
    const snake = new Snake();
    const board = new Board();
    const menu = new Menu();
    const food = new Food();
    const game = new Game();
    const score = 0;

    // const godModeCheckbox = document.getElementById('god-mode-checkbox');
    // godModeCheckbox.addEventListener("change", () => {
    //     console.log(godModeCheckbox.checked);
    //     settings.godMode = godModeCheckbox.checked;
    //     console.log(settings.godMode);
    // });

    settings.init({ speed: 10, winLength: 5});
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
