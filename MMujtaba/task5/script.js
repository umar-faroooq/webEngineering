// Let's create a blueprint for our Tasks using an ES6 Class
class Task {
    constructor(text) {
        this.text = text;
        this.isCompleted = false; // Tasks start unfinished
        this.id = Date.now(); // We give it a unique ID based on the exact time
    }
}

// We'll store our list of tasks in this array using 'let' so we can overwrite it when deleting
let myTasks = [];

// Grab our HTML elements so we can interact with them
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Arrow function block to redraw the screen whenever data changes
const renderTasks = () => {
    
    // 1. We build a giant chunk of HTML by looping through our tasks
    let htmlContent = "";
    
    myTasks.forEach((task, index) => {
        // If it's completed, we add a CSS class to cross it out
        let textClass = task.isCompleted ? "completed-text" : "task-text";
        
        // We use template literals (the backticks) to inject HTML easily
        // Notice we give the buttons unique IDs using the 'index' number!
        htmlContent += `
            <li>
                <span class="${textClass}">${task.text}</span>
                <div class="buttons">
                    <button id="completeBtn-${index}" class="complete-btn">✓</button>
                    <button id="deleteBtn-${index}" class="delete-btn">✗</button>
                </div>
            </li>
        `;
    });
    
    // 2. We print all that HTML onto the screen at once!
    taskList.innerHTML = htmlContent;

    // 3. Now that the buttons physically exist on the screen, we loop again to give them clicks
    myTasks.forEach((task, index) => {
        
        // Arrow function for the Complete button
        document.getElementById(`completeBtn-${index}`).addEventListener("click", () => {
            task.isCompleted = !task.isCompleted; // Flip the true/false status
            renderTasks(); // Redraw the screen to show the cross-out!
        });

        // Arrow function for the Delete button
        document.getElementById(`deleteBtn-${index}`).addEventListener("click", () => {
            // We use filter() to completely delete the task and save the new shorter list
            myTasks = myTasks.filter(item => item.id !== task.id);
            renderTasks(); // Redraw the screen so the task disappears!
        });
        
    });
};

// Arrow function for our main "Add Task" button at the top
addBtn.addEventListener("click", () => {
    // Make sure they didn't just add empty space
    if (taskInput.value.trim() !== "") {
        // Make a new Task object
        let newTask = new Task(taskInput.value);
        
        // Push it into our array using let/const rules
        myTasks.push(newTask);
        
        // Clear the text box so they can type another task
        taskInput.value = "";
        
        // Redraw our screen to see it!
        renderTasks();
    }
});
