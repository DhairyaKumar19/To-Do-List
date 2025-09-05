
let tasks = [];
let taskIdCounter = 0;


function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText === '') {
        input.focus();
        return;
    }
    
    const task = {
        id: taskIdCounter++,
        text: taskText,
        completed: false,
        createdAt: new Date()
    };
    
    tasks.push(task);
    input.value = '';
    input.focus();
    
    renderTasks();
    updateStats();
}


function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        updateStats();
    }
}


function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
    updateStats();
}

function renderTasks() {
    const container = document.getElementById('tasksContainer');
    const emptyState = document.getElementById('emptyState');
    
    if (tasks.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    container.innerHTML = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}">
            <input type="checkbox" 
                   class="task-checkbox" 
                   ${task.completed ? 'checked' : ''} 
                   onchange="toggleTask(${task.id})">
            <span class="task-text ${task.completed ? 'completed' : ''}">${escapeHtml(task.text)}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">×</button>
        </div>
    `).join('');
}

function updateStats() {
    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const statsElement = document.getElementById('stats');
    
    statsElement.textContent = `${totalTasks} task${totalTasks !== 1 ? 's' : ''} • ${completedTasks} completed`;
}


function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


function init() {
    const taskInput = document.getElementById('taskInput');
    

    if (taskInput) {

        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });
        

        taskInput.focus();
    } else {
        console.warn('Task input element not found during initialization');
    }
}


document.addEventListener('DOMContentLoaded', init);
