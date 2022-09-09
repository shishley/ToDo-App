window.addEventListener('load', ()=> {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })

    newTodoForm.addEventListener('submit', e=> {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos) );

        e.target.reset();

        DisplayTodos();
    })

    DisplayTodos();
})

    function DisplayTodos() {
        const todoList = document.querySelector('#todo-list');

        todoList.innerHTML = '';

        todos.forEach(todo =>{
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item')

            const label = document.createElement('label');
            const input = document.createElement('input');
            const span = document.createElement('span');
            const content = document.createElement('div');
            const actions = document.createElement('div');
            const editbt = document.createElement('button');
            const deletebt = document.createElement('button');

            input.type = 'checkbox';
            input.checked = todo.done;
        })
    }
