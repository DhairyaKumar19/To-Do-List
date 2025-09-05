// Task management system
let tasks = [];
let taskIdCounter = 0;

/**
 * Add a new task to the list
 */
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

/**
 * Toggle task completion status
 * @param {number} id - Task ID
 */
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        updateStats();
    }
}

/**
 * Delete a task from the list
 * @param {number} id - Task ID
 */
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
    updateStats();
}

/**
 * Render all tasks to the DOM
 */
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

/**
 * Update task statistics
 */
function updateStats() {
    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const statsElement = document.getElementById('stats');
    
    statsElement.textContent = `${totalTasks} task${totalTasks !== 1 ? 's' : ''} • ${completedTasks} completed`;
}

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Initialize the application
 */
function init() {
    const taskInput = document.getElementById('taskInput');
    
    // Check if input exists before adding event listener
    if (taskInput) {
        // Allow adding tasks with Enter key
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });
        
        // Focus input on load
        taskInput.focus();
    } else {
        console.warn('Task input element not found during initialization');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
