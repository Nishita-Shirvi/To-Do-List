// document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);
document.getElementById('add-task').addEventListener('click', addTask);
document.getElementById('clear-all').addEventListener('click', clearAllTasks);

function addTask() {
    const taskInput = document.getElementById('new-task');
    const prioritySelect = document.getElementById('priority');
    const taskText = taskInput.value.trim();
    const taskPriority = prioritySelect.value;
    
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    // Create list item
    const listItem = document.createElement('li');
    listItem.classList.add(`priority-${taskPriority.toLowerCase()}`);

    // Task text span
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.addEventListener('click', toggleComplete);

    // Edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(listItem, taskSpan));

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(listItem));

    // Append elements to the list item
    listItem.appendChild(taskSpan);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    // Add the list item to the to-do list
    document.getElementById('todo-list').appendChild(listItem);

    // Save to local storage
    saveTaskToLocalStorage(taskText, taskPriority);

    // Clear input field
    taskInput.value = '';
}

function toggleComplete(event) {
    event.target.parentElement.classList.toggle('completed');
    updateLocalStorage();
}

function editTask(listItem, taskSpan) {
    const newTask = prompt('Edit your task:', taskSpan.textContent);
    if (newTask !== null && newTask.trim() !== '') {
        taskSpan.textContent = newTask.trim();
        updateLocalStorage();
    }
}

function deleteTask(listItem) {
    listItem.remove();
    updateLocalStorage();
}

function clearAllTasks() {
    document.getElementById('todo-list').innerHTML = '';
    localStorage.removeItem('tasks');
}

// Local Storage Functions
function saveTaskToLocalStorage(taskText, taskPriority) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, priority: taskPriority });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.classList.add(`priority-${task.priority.toLowerCase()}`);

        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;
        taskSpan.addEventListener('click', toggleComplete);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(listItem, taskSpan));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(listItem));

        listItem.appendChild(taskSpan);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        document.getElementById('todo-list').appendChild(listItem);
    });
}

function updateLocalStorage() {
    const listItems = document.querySelectorAll('#todo-list li');
    const tasks = [];
    listItems.forEach(item => {
        const taskText = item.querySelector('span').textContent;
        const priority = item.classList.contains('priority-low') ? 'Low' :
                         item.classList.contains('priority-medium') ? 'Medium' :
                         'High';
        tasks.push({ text: taskText, priority });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
