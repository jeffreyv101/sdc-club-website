// Officer List consists of stock images for now until next year when this website will be released
let officerList = [
    ["images/officerteam/loc.jpg", "Loc 'Lop' Nguyen", "President & Tech Mentor"], 
    ["images/officerteam/kaelyn.jpg", "Kaelyn Haynie", "Vice President"],
    ["images/officerteam/jack.jpg", "Jack Harris", "Director of Finance & Logistics"],
    ["images/officerteam/cameron.jpg", "Cameron Kauffman", "Director of Innovation & Growth"],
    ["images/officerteam/jonathan.jpg", "Jonathan Sulgrove", "Director of Teams & Technology"],
    ["images/officerteam/jeffrey.jpg", "Jeffrey Vandever", "Director of External Relations and Opportunities"]
];

// Officer Index (which officer is currently being displayed)
let officerIndex = 0;

// Function to create and start the overlay
function startOverlay() {
    let overlay = document.getElementById("overlay");
    overlay.style.display = "block";

    // Create overlay-text
    let overlayText = document.createElement("div");
    overlayText.id = "overlay-text";
    overlay.appendChild(overlayText);

    // Create closeOverlay, prevOfficer, and nextOfficer buttons
    let closeOverlay = document.createElement("button");
    closeOverlay.id = "closeOverlay";
    closeOverlay.textContent = "X";
    closeOverlay.addEventListener("click", endOverlay);
    overlayText.appendChild(closeOverlay);

    let prevOfficerButton = document.createElement("button");
    prevOfficerButton.id = "prevOfficerButton";
    prevOfficerButton.textContent = "←";
    prevOfficerButton.addEventListener("click", prevOfficer);
    overlayText.appendChild(prevOfficerButton);

    let nextOfficerButton = document.createElement("button");
    nextOfficerButton.id = "nextOfficerButton";
    nextOfficerButton.textContent = "→";
    nextOfficerButton.addEventListener("click", nextOfficer);
    overlayText.appendChild(nextOfficerButton);

    // Create break to make the overlay look better
    let br = document.createElement("br");
    overlayText.appendChild(br);

    // Create officerImage
    let officerImage = document.createElement("img");
    officerImage.id = "officerImage";
    overlayText.appendChild(officerImage);

    // Create officerName and officerTitle
    let officerName = document.createElement("h1");
    officerName.id = "officerName";
    overlayText.appendChild(officerName);

    let officerTitle = document.createElement("p");
    officerTitle.id = "officerTitle";
    overlayText.appendChild(officerTitle);
}

// Function to end the overlay
function endOverlay() {
    document.getElementById("overlay").style.display = "none";

    // Remove overlay-text
    let overlayText = document.getElementById("overlay-text");
    overlayText.remove();

    // Reset officerIndex
    officerIndex = 0;
}

// Function to display the officer selected
function displayOfficer() {
    document.getElementById("officerImage").src = officerList[officerIndex][0];
    document.getElementById("officerImage").alt = officerList[officerIndex][1];
    document.getElementById("officerName").innerHTML = officerList[officerIndex][1];
    document.getElementById("officerTitle").innerHTML = officerList[officerIndex][2];
}

// Function to go to the previous officer
function prevOfficer() {
    officerIndex--;
    if (officerIndex < 0) {
        officerIndex = officerList.length - 1;
    }
    displayOfficer();
}

// Function to go to the next officer
function nextOfficer() {
    officerIndex++;
    if (officerIndex >= officerList.length) {
        officerIndex = 0;
    }
    displayOfficer();
}