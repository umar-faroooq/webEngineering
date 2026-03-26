// Task class
class Task {
constructor(text, completed = false){
this.id = Date.now();
this.text = text;
this.completed = completed;
}
}

// Task Manager
class TaskManager {

constructor(){
this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
this.renderTasks();
}

// Save to local storage
saveTasks(){
localStorage.setItem("tasks", JSON.stringify(this.tasks));
}

// Add task
addTask(text){
this.tasks.push(new Task(text));
this.saveTasks();
this.renderTasks();
}

// Toggle complete
toggleTask(id){
this.tasks = this.tasks.map(task =>
task.id === id ? {...task, completed: !task.completed} : task
);
this.saveTasks();
this.renderTasks();
}

// Delete task
deleteTask(id){
this.tasks = this.tasks.filter(task => task.id !== id);
this.saveTasks();
this.renderTasks();
}

// Update counter
updateCounter(){
const total = this.tasks.length;
const completed = this.tasks.filter(t => t.completed).length;

document.getElementById("counter").innerText =
`${completed} of ${total} tasks completed`;
}

// Render UI
renderTasks(){

const list = document.getElementById("taskList");
list.innerHTML = "";

// Loop tasks
this.tasks.forEach(task => {

const li = document.createElement("li");

if(task.completed){
li.classList.add("completed");
}

// Task content
li.innerHTML = `
<span>
${task.text}
${task.completed ? '<span class="done-badge" style="color: green;"><i class="fa-solid fa-check"></i> Done</span>' : ''}
</span>

<div class="actions">
<button class="complete-btn">
<i class="fa-solid fa-check"></i>
</button>

<button class="delete-btn">
<i class="fa-solid fa-trash"></i>
</button>
</div>
`;

const completeBtn = li.querySelector(".complete-btn");
const deleteBtn = li.querySelector(".delete-btn");

// Arrow functions
completeBtn.addEventListener("click", () => this.toggleTask(task.id));
deleteBtn.addEventListener("click", () => this.deleteTask(task.id));

list.appendChild(li);

});

this.updateCounter();
}

}

// Create manager
const manager = new TaskManager();

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

// Add task
addBtn.addEventListener("click", () => {

const text = input.value.trim();

if(!text) return;

manager.addTask(text);
input.value = "";

});

// Enter key support
input.addEventListener("keypress", (e) => {
if(e.key === "Enter"){
addBtn.click();
}
});