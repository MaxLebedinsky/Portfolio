  const lists = document.querySelectorAll('.list');

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
          textarea.value = '';
          value = '';
          form.style.display = 'none';
          btn.style.display = 'flex';
      });

      addBtn.addEventListener('click', () => {
            const newItem = document.createElement('div');
            newItem.classList.add('list-item');
            newItem.draggable = 'true';
            newItem.textContent = value;
            lists[0].append(newItem);

            textarea.value = '';
            value = '';
            form.style.display = 'none';
            btn.style.display = 'flex';
      });
  }

  addTask();