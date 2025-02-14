let tasks = [];

// Adds a task to the list based on the users input
function addTask() 
{
    // Prevents the page from refreshing
    event.preventDefault();

    // Get the task and priority level from the user
    let taskToAdd = document.getElementById("task").value;
    let priorityLevel = document.getElementById("priorityLevel").value;

    // If the task is empty display an error message
    if (taskToAdd == "")
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
        let taskID = tasks.length;
        tasks.push(priorityLevel);
        tasks.push([taskID, taskToAdd]);
        tasks.push("<button onclick='removeTask(" + (taskID) + ")'>Delete</button>");

        displayTasks();
        taskToAdd = "";
    }
}

// Finds the task in the list and returns an index if it does
function findTask(title) 
{
    for (let i = 1; i < tasks.length; i += 3) {
        if (tasks[i][1] == title) {
            return tasks[i][0];
        }
    }
    return -1;

}

// Removes the task from the list
function removeTask(taskID) {
    for (let i = 1; i < tasks.length; i += 3) {
        if (tasks[i][0] == taskID) {
            tasks.splice(i - 1, 3);
            break;
        }
    }
    displayTasks();
}

// Displays the tasks in the list
function displayTasks() {
    let taskDiv = document.getElementById("tasks");
    
    taskDiv.innerHTML = "";
    
    // If there no tasks to display display an error message
    if (tasks.length == 0) {
        taskDiv.innerHTML = "<p>No tasks to display</p>";
    }
    // Otherwise display the tasks
    else {
        taskDiv.innerHTML += "<h3>Tasks</h3>";
        for (let i = 0; i < tasks.length; i += 3) {
            // Display the task label and the delete button
            switch (tasks[i]) {
                case "low":
                    taskDiv.innerHTML += "<p id='taskLabel'><b style='color: green'>" + tasks[i+1][1] + "</b></p>";
                    break;
                case "medium":
                    taskDiv.innerHTML += "<p id='taskLabel'><b style='color: orange'>" + tasks[i+1][1] + "</b></p>";
                    break;
                case "high":
                    taskDiv.innerHTML += "<p id='taskLabel'><b style='color: red'>" + tasks[i+1][1] + "</b></p>";
                    break;
                default:
                    taskDiv.innerHTML += "<p id='taskLabel'><b>" + tasks[i+1][1] + "</b></p>";
                    break;
            }
            taskDiv.innerHTML += "<p id='taskDelete'>" + tasks[i + 2] + "</p>";
            
        }
    }
}