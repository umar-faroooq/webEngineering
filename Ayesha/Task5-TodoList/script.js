// Task 5 - Dynamic To-Do List
// Ayesha - Using ES6 Classes and Array Methods

// Task Class (ES6 Class)
class Task {
    constructor(id, title, completed = false, createdAt = new Date()) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.createdAt = createdAt;
    }
    
    // Method to toggle completion status
    toggleComplete() {
        this.completed = !this.completed;
    }
    
    // Method to format date for display
    getFormattedDate() {
        return this.createdAt.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// TaskManager Class (ES6 Class)
class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.nextId = 1;
    }
    
    // Add new task
    addTask(title) {
        if (!title.trim()) return null;
        
        const newTask = new Task(this.nextId++, title);
        this.tasks.push(newTask);
        return newTask;
    }
    
    // Delete task
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
    
    // Toggle task completion
    toggleTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.toggleComplete();
        }
    }
    
    // Get filtered tasks based on current filter
    getFilteredTasks() {
        switch(this.currentFilter) {
            case 'pending':
                return this.tasks.filter(task => !task.completed);
            case 'completed':
                return this.tasks.filter(task => task.completed);
            default:
                return this.tasks;
        }
    }
    
    // Get statistics using array methods
    getStats() {
        return {
            total: this.tasks.length,
            completed: this.tasks.filter(task => task.completed).length,
            pending: this.tasks.filter(task => !task.completed).length
        };
    }
    
    // Clear all completed tasks using filter
    clearCompleted() {
        this.tasks = this.tasks.filter(task => !task.completed);
    }
    
    // Clear all tasks
    clearAll() {
        this.tasks = [];
        this.nextId = 1;
    }
    
    // Set filter
    setFilter(filter) {
        this.currentFilter = filter;
    }
}

// Initialize TaskManager
const taskManager = new TaskManager();

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const tasksContainer = document.getElementById('tasksContainer');
const emptyState = document.getElementById('emptyState');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const pendingTasksEl = document.getElementById('pendingTasks');
const clearAllBtn = document.getElementById('clearAllBtn');

// Filter buttons
const showAllBtn = document.getElementById('showAll');
const showPendingBtn = document.getElementById('showPending');
const showCompletedBtn = document.getElementById('showCompleted');

// Load sample tasks (optional - comment out if not needed)
const loadSampleTasks = () => {
    const sampleTasks = [
        'Complete JavaScript project',
        'Review ES6 features',
        'Practice array methods',
        'Submit pull request',
        'Study for exam'
    ];
    
    sampleTasks.forEach(title => taskManager.addTask(title));
};

// Uncomment to load sample tasks
// loadSampleTasks();

// Render tasks function (using arrow function)
const renderTasks = () => {
    const filteredTasks = taskManager.getFilteredTasks();
    const stats = taskManager.getStats();
    
    // Update stats
    totalTasksEl.textContent = stats.total;
    completedTasksEl.textContent = stats.completed;
    pendingTasksEl.textContent = stats.pending;
    
    // Update clear all button
    clearAllBtn.disabled = stats.total === 0;
    
    // Show/hide empty state
    if (stats.total === 0) {
        emptyState.style.display = 'block';
        tasksContainer.innerHTML = '';
        tasksContainer.appendChild(emptyState);
        return;
    } else {
        emptyState.style.display = 'none';
    }
    
    // Clear container
    tasksContainer.innerHTML = '';
    
    // Render tasks using forEach
    filteredTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        tasksContainer.appendChild(taskElement);
    });
};

// Create task element (using arrow function)
const createTaskElement = (task) => {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskDiv.dataset.id = task.id;
    
    // Using template literals for HTML
    taskDiv.innerHTML = `
        <div class="task-checkbox">
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
        </div>
        <div class="task-content">
            <div class="task-title ${task.completed ? 'completed-text' : ''}">${task.title}</div>
            <div class="task-meta">
                <span><i class="fa-regular fa-calendar"></i> ${task.getFormattedDate()}</span>
            </div>
        </div>
        <div class="task-actions">
            <button class="complete-btn" title="${task.completed ? 'Mark pending' : 'Mark complete'}">
                <i class="fa-regular ${task.completed ? 'fa-circle-xmark' : 'fa-circle-check'}"></i>
            </button>
            <button class="delete-btn" title="Delete task">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
    `;
    
    // Add event listeners (arrow functions)
    const checkbox = taskDiv.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', (e) => {
        e.stopPropagation();
        taskManager.toggleTask(task.id);
        renderTasks();
    });
    
    const completeBtn = taskDiv.querySelector('.complete-btn');
    completeBtn.addEventListener('click', () => {
        taskManager.toggleTask(task.id);
        renderTasks();
    });
    
    const deleteBtn = taskDiv.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        taskManager.deleteTask(task.id);
        renderTasks();
    });
    
    return taskDiv;
};

// Add new task (arrow function)
const addNewTask = () => {
    const title = taskInput.value.trim();
    
    if (title) {
        taskManager.addTask(title);
        taskInput.value = '';
        renderTasks();
        taskInput.focus();
    } else {
        alert('Please enter a task!');
    }
};

// Event listeners (using arrow functions)
addBtn.addEventListener('click', addNewTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addNewTask();
    }
});

// Filter buttons
showAllBtn.addEventListener('click', () => {
    // Update active button
    [showAllBtn, showPendingBtn, showCompletedBtn].forEach(btn => 
        btn.classList.remove('active')
    );
    showAllBtn.classList.add('active');
    
    taskManager.setFilter('all');
    renderTasks();
});

showPendingBtn.addEventListener('click', () => {
    [showAllBtn, showPendingBtn, showCompletedBtn].forEach(btn => 
        btn.classList.remove('active')
    );
    showPendingBtn.classList.add('active');
    
    taskManager.setFilter('pending');
    renderTasks();
});

showCompletedBtn.addEventListener('click', () => {
    [showAllBtn, showPendingBtn, showCompletedBtn].forEach(btn => 
        btn.classList.remove('active')
    );
    showCompletedBtn.classList.add('active');
    
    taskManager.setFilter('completed');
    renderTasks();
});

// Clear all button
clearAllBtn.addEventListener('click', () => {
    if (taskManager.tasks.length > 0) {
        if (confirm('Are you sure you want to delete all tasks?')) {
            taskManager.clearAll();
            renderTasks();
        }
    }
});

// Initial render
renderTasks();