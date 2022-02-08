const lists = document.querySelectorAll('.list');
const addBoardButton = document.querySelector('.button');
document.querySelectorAll('.list-item').forEach(card => initCloseHandler(card, '.close-card-btn'));

function addTask() {
    const btn = document.querySelector('.add-btn');
    const addBtn = document.querySelector('.add-item-btn');
    const cancelBtn = document.querySelector('.cancel-item-btn');
    const textarea = document.querySelector('.textarea');
    const form = document.querySelector('.form');

    let value;

    btn.addEventListener('click', () => {
        form.style.display = 'block';
        btn.style.display = 'none';
        addBtn.style.display = 'none';

        textarea.addEventListener('input', e => {
            value = e.target.value;
            if (value) {
                addBtn.style.display = 'block';
            } else {
            addBtn.style.display = 'none';
            }
        });
    });

    cancelBtn.addEventListener('click', () => {
    clearForm()
    });

    addBtn.addEventListener('click', () => {
        const newItem = document.createElement('div');
        newItem.classList.add('list-item');
        newItem.draggable = 'true';
        newItem.textContent = value;
        newItem.insertAdjacentHTML("beforeend", '<i class="fas fa-times close-card-btn"></i>');
        lists[0].append(newItem);

        initCloseHandler(newItem, '.close-card-btn');

        clearForm()

        dragNdrop();
    });

    function clearForm() {
        textarea.value = '';
        value = '';
        form.style.display = 'none';
        btn.style.display = 'flex';
    }
}

addTask();

function initCloseHandler (item, selector) {
    const closeBtn = item.querySelector(selector);
    closeBtn.addEventListener('click', (e) => {
        item.remove();
    })
}

function addBoard() {
    const boards = document.querySelector('.boards');
    const board = document.createElement('div');
    board.classList.add('boards-item');
    board.innerHTML = `
        <span contenteditable="true" class="title">Enter title</span>
        <div class="list"></div>
        <i class="far fa-window-close close-board-btn"></i>
    `;
    boards.append(board);

    initChangeTitles();

    dragNdrop();

    initDelBoards();
}

addBoardButton.addEventListener('click', addBoard);

function initChangeTitles() {
    const titles = document.querySelectorAll('.title');

    titles.forEach(title => {
        title.addEventListener('click', e => {
            if (e.target.textContent === 'Enter title') 
            {e.target.textContent = ''}
        });
    })
}

initChangeTitles();

let draggedItem = null; 

function dragNdrop() {
    const lists = document.querySelectorAll('.list');
    const listItems = document.querySelectorAll('.list-item');

    for(let i = 0; i < listItems.length; i++) {
        const item = listItems[i];

        item.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() => {
                item.style.display = 'none';
            }, 0);
        });

        item.addEventListener('dragend', () => {
            setTimeout(() => {
                item.style.display = 'block';
                draggedItem = null;
            }, 0);
        });

        item.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            item.remove();
        });

        for (let j = 0; j < lists.length; j++) {
            const list = lists[j];

            list.addEventListener('dragover', (e) => e.preventDefault());

            list.addEventListener('dragenter', function (e) {
                e.preventDefault();
                this.style.backgroundColor = 'rgba(0, 0, 0, .3)';
            });

            list.addEventListener('dragleave', function (e) {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            });

            list.addEventListener('drop', function (e) {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                this.append(draggedItem);
            })
        }
    }
}

dragNdrop();

function initDelBoards() {
    const closeBoardButtons = document.querySelectorAll('.close-board-btn');

    for (let i = 0; i < closeBoardButtons.length; i++) {
        const cross = closeBoardButtons[i];
        cross.addEventListener('click', (e) => {
            let delConfirmed = confirm('Delete this board?');
            if(delConfirmed) {e.target.parentNode.remove();}
        });
    }
}

initDelBoards()