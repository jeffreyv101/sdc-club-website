// Modification since project 7: Creating and utilizing a Task Object

/*
    Array format for tasks:

    tasks = [
        Task {id, label, priority, image, dueDate, status, deleteButton}
    ]

    Example:
    tasks = [
        Task {0, "Task 1", "high", "image.png", "2025-10-01", "incomplete", "<button onclick='removeTask(0)'>Delete</button>"},

        Task {1, "Task 2", "medium", "image.png", "2025-10-02", "incomplete", "<button onclick='removeTask(1)'>Delete</button>"}
        }
    ]
*/
let tasks = [];
let form = document.forms['taskForm'];

// Adds a task to the list based on the users input
function addTask() 
{
    // Prevents the page from refreshing
    event.preventDefault();

    let taskToAdd = form.elements["task"].value;
    
    // Get the task and priority level from the user
    const priorityLevel = form.elements["priorityLevel"].value;
    let status = form.elements["status"].value;
    let dueDate = form.elements["dueDate"].value;
    
    let imageInput = form.elements["images"];
    let image = "";
    if (imageInput.files && imageInput.files[0]) {
        image = URL.createObjectURL(imageInput.files[0]);
    }

    const taskRegex = /^[^<>]*$/;
    
    // If the task contains < or > display an error message
    // This is so that the user cannot inject HTML or JavaScript into the task form
    if (!taskRegex.test(taskToAdd)) {
        alert("Task name cannot contain < or >");
    }
    // If the task is empty display an error message
    else if (taskToAdd == "")
    {
        alert("Please enter a task label");
    }
    // If the task already exists display an error message
    else if (findTask(taskToAdd) != -1)
    {
        alert("Task already exists");
    }
    // Otherwise add the task to the list
    else
    {
        const taskID = tasks.length;

        const newTask = new Task(taskID, taskToAdd, priorityLevel, image, dueDate, status);
        tasks.push(newTask);

        // Reset the form
        form.reset();

        // Change the status of the task
        form.elements["status"].value = "not-started";

        // Display results
        displayTasks();
    }
}

// Finds the task in the list and returns an index if it does
function findTask(title) 
{
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].label == title) {
            return tasks[i];
        }
    }
    return -1;

}

// Removes the task from the list
function removeTask(taskID) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == taskID) {
            tasks.splice(i, 1);
            break;
        }
    }
    displayTasks();
}

// Displays the tasks in the list
function displayTasks() {
    // Create the task info div
    let taskDiv = document.getElementById("taskDiv");
    taskDiv.innerHTML = "";
    
    // If there no tasks to display display an error message
    if (tasks.length == 0) {
        taskDiv.innerHTML = "<p>No tasks to display</p>";
    }
    // Otherwise display the tasks
    else {
        taskDiv.innerHTML += "<h2>Tasks</h2>";

        // Display the tasks as they are set up in the array
        for (let i = 0; i < tasks.length; i++) {
            const newTask = document.createElement("div");
            newTask.className = "task";
            taskDiv.appendChild(newTask);

            // Display the task image
            newTask.innerHTML += tasks[i].image;
            
            // Create the task info div
            const taskInfo = document.createElement("div");
            taskInfo.className = "taskInfo";
            newTask.appendChild(taskInfo);

            // Display the task label and the delete button
            switch (tasks[i].label) {
                case "low":
                    taskInfo.innerHTML += "<p class='taskLabel'><b style='color: green'>" + tasks[i].label + "</b></p>";
                    break;
                case "medium":
                    taskInfo.innerHTML += "<p class='taskLabel'><b style='color: orange'>" + tasks[i].label + "</b></p>";
                    break;
                case "high":
                    taskInfo.innerHTML += "<p class='taskLabel'><b style='color: red'>" + tasks[i].label + "</b></p>";
                    break;
                default:
                    taskInfo.innerHTML += "<p class='taskLabel'><b>" + tasks[i].label + "</b></p>";
                    break;
            }
            
            // Display the status
            if (tasks[i].status == "in-progress") {
                taskInfo.innerHTML += "<p class='taskStatus'><b style='color: blue'>In Progress</b></p>";
            }
            else {
                taskInfo.innerHTML += "<p class='taskStatus'><b style='color: gray'>Not Started</b></p>";
            }

            // Convert the due date to a Date object
            // Calculate the number of days until the due date
            // Display the number of days until the due date
            const dateString = tasks[i].dueDate;

            if (dateString != "") {
                const dateParts = dateString.split("-");
                const year = parseInt(dateParts[0], 10);
                const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed
                const day = parseInt(dateParts[2], 10);
                const dateObject = new Date(year, month, day);

                const daysTillDue = Math.ceil((dateObject - new Date()) / (1000 * 60 * 60 * 24));

                // Display the due date
                switch (daysTillDue) {
                    case 7:
                        taskInfo.innerHTML += "<p class='taskDueDate'>Seven Days Left</p>";
                        break;
                    case 6:
                        taskInfo.innerHTML += "<p class='taskDueDate'> Six Days Left</p>";
                        break;
                    case 5:
                        taskInfo.innerHTML += "<p class='taskDueDate'>Five Days Left</p>";
                        break;
                    case 4:
                        taskInfo.innerHTML += "<p class='taskDueDate'>Four Days Left</p>";
                        break;
                    case 3:
                        taskInfo.innerHTML += "<p class='taskDueDate'>Three Days Left</p>";
                        break;
                    case 2:
                        taskInfo.innerHTML += "<p class='taskDueDate'>Two Days Left</p>";
                        break;
                    case 1:
                        taskInfo.innerHTML += "<p class='taskDueDate'>One Day Left</p>";
                        break;
                    case 0:
                        taskInfo.innerHTML += "<p class='taskDueDate'>Due Today!</p>";
                        break;
                    default:
                        taskInfo.innerHTML += "<p class='taskDueDate'>Due on: " + month + "/" + day + "/" + year + "</p>";
                        break;
                }
            }

            // Display the delete button
            newTask.innerHTML += tasks[i].deleteButton;
            
        }
    }
}