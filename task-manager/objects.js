class Task {
    // Constructor:
    constructor(id, label, priority, image, dueDate, status){
        this._id = id;
        this._label = label;
        this._priority = priority;

        // If the image exists and works, use it.
        if (image != "") {
            this._image = "<img src='" + image + "' alt='Task Image' class='taskImage'>";
        }
        // Else, the image does not exist or does not work, so the default shall be used.
        else {
            this._image = "<img src='images/misc/default-task.jpg' alt='Task Image' class='taskImage' width='15%' height='15%'>";
        }

        this._dueDate = dueDate;
        this._status = status;
        this._deleteButton = "<div class='taskDelete'><button class='taskDelete' onclick='removeTask(" + id + ")'>Delete</button></div>";
    }

    // Getters:
    get id() {
        return this._id;
    }

    get label() {
        return this._label;
    }

    get priority() {
        return this._priority;
    }

    get image() {
        return this._image;
    }

    get dueDate() {
        return this._dueDate;
    }

    get status() {
        return this._status;
    }

    get deleteButton() {
        return this._deleteButton;
    }

    // Setters:
    set id(newID) {
        this._id = newID;
    }
    
    set label(newName) {
        this._label = newName;
    }

    set imageFromFile(newImage) {
        if (newImage != "") {
            this._image = "<img src='" + newImage + "' alt='Task Image' class='taskImage'>";
        }
        // Else, the image does not exist or does not work, so the default shall be used.
        else {
            this._image = "<img src='images/misc/default-task.jpg' alt='Task Image' class='taskImage' width='15%' height='15%'>";
        }
    }

    set image(newImage) {
        this._image = newImage;
    }

    set dueDate(newDueDate) {
        this._dueDate = newDueDate;
    }

    set status(newStatus) {
        this._status = newStatus;
    }
}