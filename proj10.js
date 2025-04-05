// Project 10: Puzzle Game

// Set up best time from last game
let bestTime = localStorage.getItem('bestTime') || -1; // Get the best time from local storage or set to -1

if (bestTime === -1) {
    document.getElementById('scoreboard').innerHTML = "Best Time: No best time yet"; // Display no best time
}
else {
    document.getElementById('scoreboard').innerHTML = `Best Time: ${bestTime} seconds`; // Display the best time
}

// Default Puzzles to use
puzzles = ["logo.png", "jeffrey.jpg"];

// This gets a random integer between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

// Used for shuffling the array of puzzle pieces
function randomizeArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getRandomInt(0, i + 1);
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Once the start button is clicked, this function initializes the puzzle game
function startPuzzle() {
    let puzzle = puzzles[getRandomInt(0, puzzles.length)]; // Randomly select a puzzle

    document.getElementById('start-button').disabled = true; // Disable the start button
    document.getElementById('start-button').onclick = null; // Disable the click event
    document.getElementById('stop-button').disabled = false; // Enable the stop button
    document.getElementById('stop-button').onclick = stopPuzzle; // Set the click event for the stop button
    document.getElementById('stop-button').innerHTML = "Stop"; // Change the stop button text

    let pieces = []; // Array to hold the pieces of the puzzle
    // Loop to create the pieces of the puzzle
    for (let row = 1; row < 4; row++) {
        for (let col = 1; col < 4; col++) {
            pieces.push(`${col}x${row}${puzzle}`); // Push each piece with its proper position
            // Example: "1x1logo.png", "1x2logo.png", etc.
        }
    }

    // Set up image reference
    const imageRefDiv = document.getElementById('image-reference');
    const imageRef = document.createElement('img'); // Create an image element for the reference
    imageRefDiv.innerHTML = ""; // Clear the previous image reference
    imageRef.src = `images/puzzlepieces/${puzzle}`; // Set the image reference to the selected puzzle
    imageRef.style.width = "300px"; // Set the width of the image reference
    imageRef.style.height = "300px"; // Set the height of the image reference
    imageRefDiv.appendChild(imageRef); // Append the image reference to the div

    // Randomize the pieces array to shuffle the puzzle pieces
    randomizeArray(pieces);

    // Set up the puzzle area
    const puzzleArea = document.getElementById('puzzle');
    for (let row = 1; row < 4; row++) {
        for (let col = 1; col < 4; col++) {
            const piece = document.createElement('div');
            piece.className = 'puzzle';
            piece.id = `${col}x${row}${puzzle}`; // Set the piece ID
            piece.width = "100px"; // Set the width of each piece
            piece.height = "100px"; // Set the height of each piece
            
            const image = document.createElement('img'); // Create an image element
            const pieceIndex = (row - 1) * 3 + (col - 1); // Calculate the correct index for the pieces array
            image.src = `images/puzzlepieces/${pieces[pieceIndex]}`; // Set the image source to the shuffled piece
            image.id = `img-${pieces[pieceIndex]}`; // Set the image ID to match the piece ID
            image.style.width = "100px"; // Set the width of the image
            image.style.height = "100px"; // Set the height of the image
            piece.appendChild(image); // Append the image to the piece
            piece.draggable = true; // Make the piece draggable
            piece.ondragstart = dragstartHandler; // Set the drag start handler
            piece.ondragover = dragoverHandler; // Set the drag over handler
            piece.ondrop = dropHandler; // Set the drop handler
            
            puzzleArea.appendChild(piece); // Append the piece to the puzzle area
        }
    }

    // Set up the timer
    window.timer = 0; // Initialize the timer as a global variable
    window.timerInterval = setInterval(() => {
        timer++;
        document.getElementById('timer').innerHTML = `Time: ${timer} seconds`; // Update the timer display
    }, 1000); // Update every second
}

function dragstartHandler(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dragoverHandler(ev) {
    ev.preventDefault();
}

function dropHandler(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);

    // Check if the drop target is the correct position
    if (ev.target.parentElement.id === (draggedElement.id.replace('img-', '')) && ev.target.id !== draggedElement.id) {
        // Append the dragged element to the correct position
        const targetParent = ev.target.parentElement;

        const draggedParent = draggedElement.parentElement;

        // Swap the images
        targetParent.appendChild(draggedElement);
        draggedParent.appendChild(ev.target);

        draggedElement.draggable = false; // Disable dragging for correctly placed pieces

        // Check if the puzzle is complete
        const puzzleArea = document.getElementById('puzzle');
        const pieces = puzzleArea.querySelectorAll('.puzzle');
        let isComplete = true;

        pieces.forEach(piece => {
            if (piece.children.length === 0 || piece.children[0].id.replace('img-', '') !== piece.id) {
                isComplete = false;
            }
        });

        if (isComplete) {
            clearInterval(window.timerInterval); // Stop the timer

            setTimeout(() => {
                alert(`Congratulations! You completed the puzzle in ${window.timer} seconds.`);

                document.getElementById('stop-button').disabled = true; // Disable the stop button
                document.getElementById('stop-button').onclick = null; // Disable the click event
                document.getElementById('stop-button').innerHTML = "Game Over"; // Change the stop button text

                // Check if it's the best time
                if (window.timer < bestTime || bestTime === 0) {
                    bestTime = window.timer; // Update the best time
                    localStorage.setItem('bestTime', bestTime); // Save the best time to local storage
                    document.getElementById('scoreboard').innerHTML = `Best Time: ${bestTime} seconds`; // Update the scoreboard
                }

                // Reset the game
                const puzzleArea = document.getElementById('puzzle');
                puzzleArea.innerHTML = ""; // Clear the puzzle area
                const imageRefDiv = document.getElementById('image-reference');
                imageRefDiv.innerHTML = ""; // Clear the image reference
                document.getElementById('timer').innerHTML = `Time: 0 seconds`; // Reset the timer display
                window.timer = 0; // Reset the timer
                window.timerInterval = null; // Reset the timer interval
                document.getElementById('start-button').disabled = false; // Enable the start button
                document.getElementById('start-button').innerHTML = "Start"; // Reset the start button text
                document.getElementById('start-button').onclick = startPuzzle; // Reset the click event
            }, 100); // Make sure the alert is shown after the drop
        }
    }
    else
    {
        console.log("Invalid drop target");
        console.log("Location where you are dragging to: " + ev.target.id);
        console.log("What you are dragging: " + draggedElement.id);
    }
}

function stopPuzzle() {
    // Reset the game
    const puzzleArea = document.getElementById('puzzle');
    puzzleArea.innerHTML = ""; // Clear the puzzle area
    const imageRefDiv = document.getElementById('image-reference');
    imageRefDiv.innerHTML = ""; // Clear the image reference
    document.getElementById('timer').innerHTML = `Time: 0 seconds`; // Reset the timer display
    window.timer = 0; // Reset the timer
    window.timerInterval = null; // Reset the timer interval
    document.getElementById('start-button').disabled = false; // Enable the start button
    document.getElementById('start-button').innerHTML = "Start"; // Reset the start button text
    document.getElementById('start-button').onclick = startPuzzle; // Reset the click event
}