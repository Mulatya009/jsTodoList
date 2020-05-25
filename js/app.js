// Global variables
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('#todo-container ul');
const selectFilter = document.querySelector('.filter-todo');

// Event listeners
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', getTodo)
    todoButton.addEventListener('click', addTodo);
    todoList.addEventListener('click', deleteCheck);
    selectFilter.addEventListener('change', filterTodo);
}


// Functions
function addTodo(e) {
    e.preventDefault();
    // grab value and add to list.
    const newTodo = todoInput.value;

    if(newTodo !== '') {
        const todoWrapper = document.createElement('div');
        todoWrapper.classList.add('todo');
        const myTodo = document.createElement('li');
        myTodo.textContent = newTodo;
        myTodo.classList.add('todo-item');
        todoWrapper.appendChild(myTodo);

        // buttons.
        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        completeBtn.classList.add('complete-btn', 'px-3');
        todoWrapper.appendChild(completeBtn);

        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList.add('trash-btn', 'px-3');
        todoWrapper.appendChild(trashBtn);

        todoList.appendChild(todoWrapper);

        // call save function
        saveTodo(newTodo)

        todoInput.value = '';
    }

    else{
        const message = `
            <div id="alert" class="text-center alert-danger py-1">
                <h5>Please type your todo!!!</h5>
            </div>
        `;

        todoList.innerHTML = message;

        setTimeout(() => {
            document.querySelector('#alert').remove();
        }, 3000);
    }
}

function deleteCheck(e) {
    const item = e.target.classList[0];

    if(item === 'trash-btn'){
        // animate
        e.target.parentElement.classList.add('fall');
        removeTodo(e.target.parentElement.childNodes[0].textContent); 

        e.target.parentElement.addEventListener('transitionend', () => {
            e.target.parentElement.remove();
        });
        
    }

    if (item === "complete-btn") {
        const todo = e.target.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const allTodo = todoList.childNodes;

    allTodo.forEach(todo => {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }

                break;
            case "uncompleted": 
                if (!todo.classList.contains('completed')) {
                   todo.style.display = 'flex'; 
                }
                else {
                    todo.style.display = 'none';
                }
                break;
        
        }
    })
}

function saveTodo(todo) {
    let todoLs;

    if (localStorage.getItem('todos') === null) {
        todoLs = [];
    }
    else{
        todoLs = JSON.parse(localStorage.getItem("todos"));
    }

    todoLs.push(todo);

    localStorage.setItem("todos", JSON.stringify(todoLs));
}

function getTodo() {
    let todoLs;
    if (localStorage.getItem("todos") === null) {
        todoLs = [];
    }    
    else{
        todoLs = JSON.parse(localStorage.getItem("todos"));
    }

    todoLs.forEach(todo => {
        const todoWrapper = document.createElement('div');
        todoWrapper.classList.add('todo');
        const myTodo = document.createElement('li');
        myTodo.textContent = todo;
        myTodo.classList.add('todo-item');
        todoWrapper.appendChild(myTodo);

        // buttons.
        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        completeBtn.classList.add('complete-btn', 'px-3');
        todoWrapper.appendChild(completeBtn);

        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList.add('trash-btn', 'px-3');
        todoWrapper.appendChild(trashBtn);

        todoList.appendChild(todoWrapper);
    })
}

function removeTodo(todo) {
    let todoLs;
    if (localStorage.getItem('todos') === null) {
        todoLs = [];        
    }
    else{
        todoLs = JSON.parse(localStorage.getItem("todos"));
    }
    const index = todoLs.indexOf(todo);

    todoLs.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todoLs))
}
