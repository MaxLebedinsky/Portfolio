const lists = document.querySelectorAll('.list');
const addBoardButton = document.querySelector('.button');

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
        lists[0].append(newItem);

        clearForm()
    });

    function clearForm() {
    textarea.value = '';
    value = '';
    form.style.display = 'none';
    btn.style.display = 'flex';
    }
}

addTask();

function addBoard() {
    const boards = document.querySelector('.boards');
    const board = document.createElement('div');
    board.classList.add('boards-item');
    board.innerHTML = `
        <span contenteditable="true" class="title">Enter title</span>
        <div class="list"></div>
    `;
    boards.append(board);

    changeTitle();
}

addBoardButton.addEventListener('click', addBoard);

function changeTitle() {
    const titles = document.querySelectorAll('.title');

    titles.forEach(title => {
        title.addEventListener('click', e => e.target.textContent = '');
    })
}

changeTitle();

function dragNdrop() {

}

dragNdrop();