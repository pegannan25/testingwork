const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Load tasks from LocalStorage on startup
document.addEventListener('DOMContentLoaded', getTodos);

function addTask() {
    if (input.value === '') return;

    createTodoElement(input.value);
    saveLocalTodo(input.value);
    input.value = '';
}

function createTodoElement(text) {
    const li = document.createElement('li');
    
    li.innerHTML = `
        <span onclick="toggleComplete(this)">${text}</span>
        <span class="delete-btn" onclick="removeTodo(this)">✕</span>
    `;
    
    list.appendChild(li);
}

function toggleComplete(element) {
    element.classList.toggle('completed');
}

function removeTodo(element) {
    const todoItem = element.parentElement;
    removeLocalTodo(todoItem.children[0].innerText);
    todoItem.remove();
}

// --- Local Storage Functions ---

function saveLocalTodo(todo) {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.forEach(todo => createTodoElement(todo));
}

function removeLocalTodo(todoText) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    const filteredTodos = todos.filter(t => t !== todoText);
    localStorage.setItem('todos', JSON.stringify(filteredTodos));
}