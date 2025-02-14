let tasks = [];


function addTask() 
{
    event.preventDefault();
    let taskToAdd = document.getElementById("task").value;
    let priorityLevel = document.getElementById("priorityLevel").value;

    if (taskToAdd == "")
    {
        alert("Please enter a task label");
    }
    else if (findTask(taskToAdd) != -1)
    {
        alert("Task already exists");
    }
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

function findTask(title) 
{
    for (let i = 1; i < tasks.length; i += 3) {
        if (tasks[i][1] == title) {
            return tasks[i][0];
        }
    }
    return -1;

}

function removeTask(taskID) {
    for (let i = 1; i < tasks.length; i += 3) {
        if (tasks[i][0] == taskID) {
            tasks.splice(i - 1, 3);
            break;
        }
    }
    displayTasks();
}

function displayTasks() {
    let taskDiv = document.getElementById("tasks");
    
    taskDiv.innerHTML = "";
    
    // If there are tasks to display
    if (tasks.length == 0) {
        taskDiv.innerHTML = "<p>No tasks to display</p>";
    }
    else {
        taskDiv.innerHTML += "<h3>Tasks</h3>";
        for (let i = 0; i < tasks.length; i += 3) {
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