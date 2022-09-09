//setting up local storage for the user input

window.addEventListener('load', ()=> {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })
//clicking the add to do button will submit users input

    newTodoForm.addEventListener('submit', e=> {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }
//saving the input to local storage

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

//declaring variable to be used

            const label = document.createElement('label');
            const input = document.createElement('input');
            const span = document.createElement('span');
            const content = document.createElement('div');
            const actions = document.createElement('div');
            const editbt = document.createElement('button');
            const deletebt = document.createElement('button');

            input.type = 'checkbox';
            input.checked = todo.done;
            span.classList.add('bubble');

//creating condtions to decide

            if(todo.category == 'personal'){
                span.classList.add('personal');
            } else {
                span.classList.add('work');
            }

            content.classList.add('todo-content');
            actions.classList.add('actions');
            editbt.classList.add('edit');
            deletebt.classList.add('delete');

            content.innerHTML = `<input type="text" value="${todo.content}"
            readonly>` ;
            editbt.innerHTML = 'Edit';
            deletebt.innerHTML = 'Delete';

            label.appendChild(input);
            label.appendChild(span);
            actions.appendChild(editbt);
            actions.appendChild(deletebt);
            todoItem.appendChild(label);
            todoItem.appendChild(content);
            todoItem.appendChild(actions);

            todoList.appendChild(todoItem);

            if (todo.done) {
                todoItem.classList.add('done');
            }

            input.addEventListener('click', e => {
                todo.done = e.target.checked;
                localStorage.setItem('todos', JSON.stringify(todos));

                if (todo.done) {
                    todoItem.classList.add('done');
                } else {
                    todoItem.classList.remove('done');
                }

                DisplayTodos();
            })

//creating functioning crud buttons

            editbt.addEventListener('click', e =>{
                const input = content.querySelector('input');
                input.removeAttribute('readonly');
                input.focus();
                input.addEventListener('blur', e =>{
                    input.setAttribute('readonly', true);
                    todo.content = e.target.value;
                    localStorage.setItem('todos', JSON.stringify(todos));
                    DisplayTodos();
                })
            })

            deletebt.addEventListener('click', e =>{
                todos = todos.filter(t => t != todo);
                localStorage.setItem('todos', JSON.stringify(todos));
                    DisplayTodos();
            })
        })
    }
