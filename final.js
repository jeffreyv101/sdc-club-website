// All JS Code has been condensed into this file for easier management
/* ---- SDC Header ---- */
// Whenever the window is resized, check if the club name and project title should be changed
window.addEventListener('resize', function() {
    const clubNameElement = document.getElementById('clubName');
    const projectTitle = document.getElementById('projectTitle');
    if (window.innerWidth < 552) {
        projectTitle.textContent = 'Projects';
        clubNameElement.textContent = 'SDC';
        if (window.location.href.includes('projects')) {
            projectTitle.style.fontWeight = 'bold';
        }
    } else {
        projectTitle.textContent = 'Current Projects';
        clubNameElement.textContent = 'Software Development Club';
        if (window.location.href.includes('projects')) {
            projectTitle.style.fontWeight = 'bold';
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const clubNameElement = document.getElementById('clubName');
    const projectTitle = document.getElementById('projectTitle');
    if (window.innerWidth < 552) {
        projectTitle.textContent = 'Projects';
        clubNameElement.textContent = 'SDC';
        if (window.location.href.includes('projects')) {
            projectTitle.style.fontWeight = 'bold';
        }
    } else {
        projectTitle.textContent = 'Current Projects';
        clubNameElement.textContent = 'Software Development Club';
        if (window.location.href.includes('projects')) {
            projectTitle.style.fontWeight = 'bold';
        }
    }
});

// Project 9: Settings dialog functionality
// Get the elements for background color, text color, and font size offset
const settingsForm = document.getElementById('preferences-form');
const backgroundColor = settingsForm.elements['bg-color'];
const textColor = settingsForm.elements['text-color'];
const fontSizeOffset = settingsForm.elements['font-size-offset'];

// Get the cookie with the given name
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
}

// Set the cookie with the given name, value, and expiration days 
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Show the settings dialog
function showSettingsDialog() {
    let settingsIcon = document.getElementById('settings-icon');
    let settingsDialog = document.getElementById("settingsDialog");

    settingsDialog.style.display = 'block';
    settingsIcon.onclick = hideSettingsDialog;

    showCurrentSettings(backgroundColor.value, textColor.value, fontSizeOffset.value);
}

// Hide the settings dialog
function hideSettingsDialog() {
    let settingsIcon = document.getElementById('settings-icon');

    document.getElementById('settingsDialog').style.display='none';
    settingsIcon.onclick = showSettingsDialog;
}

// Display current preferences to user
function showCurrentSettings(bg, text, size) {
    const output = document.getElementById('current-settings');
    if (output) {
        output.innerHTML = `
            <strong>Current Settings:</strong><br>
            Background Color: ${bg}<br>
            Text Color: ${text}<br>
            Font Size: ${size}px
        `;
    }
}


// Sets the content foreground color based on the background color
function setForegroundColor() {
    const bgColor = backgroundColor.value;

    // Function to lighten the color - from https://stackoverflow.com/questions/5560248 with a lot of troubleshooting assistance from GitHub Copilot
    function lightenColor(color, percent) {
        const num = parseInt(color.slice(1), 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            G = (num >> 8 & 0x00FF) + amt,
            B = (num & 0x0000FF) + amt;
        
        
        return `#${(0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)}`;
    }

    let fgColor;
    if (bgColor.toLowerCase() === '#ffffff') {
        fgColor = '#EBEBEB'; // If the background color is white, keep it white
    } else {
        fgColor = lightenColor(bgColor, 20); // Lighten the background color by 20%
    }

    document.getElementById('content').style.backgroundColor = fgColor;
}

// Apply preferences to the page
function applyPreferences() {
    event.preventDefault();

    // Set the background color
    document.body.style.backgroundColor = backgroundColor.value;

    setCookie('sdcBackgroundColor', backgroundColor.value, 2);

    setForegroundColor(backgroundColor.value);

    // Set the text color
    if (textColor) {
        document.querySelector('body').style.color = textColor.value;
    }

    setCookie('sdcTextColor', textColor.value, 2);
    
    // Set the font size
    setCookie('sdcFontSizeOffset', fontSizeOffset.value, 2);
    document.querySelector('h2').style.fontSize = `${16 + fontSizeOffset.value/10}px`;
    document.querySelector('p').style.fontSize = `${12 + fontSizeOffset.value/10}px`;

    showCurrentSettings(backgroundColor.value, textColor.value, fontSizeOffset.value);
}

// Apply the preferences to the page when loaded
window.addEventListener("DOMContentLoaded", () => {
    // Set form with previous values
    if (getCookie('sdcBackgroundColor')) {
        backgroundColor.value = getCookie('sdcBackgroundColor');
    }

    if (getCookie('sdcTextColor')) {
        textColor.value = getCookie('sdcTextColor');
    }

    if (getCookie('sdcFontSizeOffset')) {
        fontSizeOffset.value = getCookie('sdcFontSizeOffset');
    }

    // Set site with previous values
    document.body.style.backgroundColor = backgroundColor.value;
    setForegroundColor();

    document.querySelector('body').style.color = textColor.value;
    document.querySelector('h2').style.fontSize = `${16 + parseInt(fontSizeOffset.value/10)}px`;
    document.querySelector('p').style.fontSize = `${12 + parseInt(fontSizeOffset.value/10)}px`;
});

/* ---- Officer Overlay Functionality ---- */
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

/* ---- Contact Form Functionality ---- */
function createAccount() {
    // Prevent reload
    event.preventDefault();

    let form = document.forms['contactform'];
    
    // Form validation
    try 
    {
        
        // -- Validate Full Name -- \\
        console.log(form.elements["name"].value);
        // Length validation
        if (form.elements["name"].value == "")
            throw "Full Name cannot be empty!";

        // Using RegEx test if the full name contains only letters
        let letters = /^[a-z ]+$/i;
        if (!letters.test(form.elements["name"].value))
            throw "Full Name needs to be alphabetic!";

        // -- Validate Username -- \\
        console.log(form.elements["username"].value);
        // Length validation

        if (form.elements["username"].value.length < 6)
            throw "Username is too short!";
        else if (form.elements["username"].value.length > 15)
            throw "Username is too long!";

        // Validate that the username starts with a letter
        if (!/^[a-z]/i.test(form.elements["username"].value))
            throw "Username must start with a letter!"
        
        // Using RegEx test if the username contains only alphanumeric characters
        let alphanumeric = /^[a-z0-9 ]+$/i;
        if (!alphanumeric.test(form.elements["username"].value))
            throw "Username needs to be alphanumeric!";

        // -- Validate Email -- \\
        console.log(form.elements["email"].value);

        if (form.elements["email"].value == "")
            throw "Email cannot be empty!";

        // Using RegEx test if the email is in the correct format
        let email = /\S+@\S+\.\S+/;
        if (!email.test(form.elements["email"].value))
            throw "Email is not in the correct format!";

        // -- Validate Password -- \\
        // Length validation
        if (form.elements["password"].value.length < 8)
            throw "Password is too short!";
        else if (form.elements["password"].value.length > 20)
            throw "Password is too long!";

        // Contains one uppercase letter
        if (!/[A-Z]/.test(form.elements["password"].value))
            throw "Password needs an uppercase letter!";

        // Contains one lowercase letter
        if (!/[a-z]/.test(form.elements["password"].value))
            throw "Password needs a lowercase letter!";

        // Contains one digit and special character
        if (!/\d/.test(form.elements["password"].value))
            throw "Password needs a digit!";
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.elements["password"].value))
            throw "Password needs a special character!";

        // -- Validate Password and Confirm Password -- \\
        if (form.elements["password"].value != form.elements["confirm-password"].value)
            throw "Passwords do not match";
        
        // -- Validate Phone Number -- \\
        console.log(form.elements["phone"].value);
        // Length validation
        if (form.elements["phone"].value.length < 10)
            throw "Phone number is too short!";
        else if (form.elements["phone"].value.length > 15)
            throw "Phone number is too long!";

        // Using RegEx test if the phone number contains only numbers
        let numbers = /^[0-9-()\ ]+$/;
        if (!numbers.test(form.elements["phone"].value))
            throw "Phone number needs to be numeric!";

        // -- Validate Date of Birth -- \\
        console.log(form.elements["date-of-birth"].value);
        if (form.elements["date-of-birth"].value == "")
            throw "Date of Birth cannot be empty!";

        // Age validation
        let dob = new Date(form.elements["date-of-birth"].value);
        let ageDifMs = Date.now() - dob.getTime();
        let ageDate = new Date(ageDifMs); // miliseconds from epoch
        let age = Math.abs(ageDate.getUTCFullYear() - 1970);

        if (age < 18)
            throw "You must be at least 18 years old to create an account!";
        
        // -- Ensure Terms are agreed to -- \\
        console.log(form.elements["confirm-agreement"].value);
        if (form.elements["confirm-agreement"].value == 'off')
            throw "You must agree to the terms and conditions!";
    }
    catch (err)
    {
        alert(err);
    }

    alert("Account created!");
}

// Function to end the agreement overlay
function hideAgreement() {
    document.getElementById("overlay").style.display = "none";

    // Remove overlay-text
    let overlayText = document.getElementById("overlay-text");
    overlayText.remove();
}

// Function to create and start the agreement overlay
function showAgreement() {
    // Prevent reload
    event.preventDefault();

    let overlay = document.getElementById("overlay");
    overlay.style.display = "block";

    // Create overlay-text
    let overlayText = document.createElement("div");
    overlayText.id = "overlay-text";
    overlay.appendChild(overlayText);

    // Create closeOverla
    let closeOverlay = document.createElement("button");
    closeOverlay.id = "closeOverlay";
    closeOverlay.textContent = "X";
    closeOverlay.addEventListener("click", hideAgreement);
    overlayText.appendChild(closeOverlay);

    // Create break to make the overlay look better
    let br = document.createElement("br");
    overlayText.appendChild(br);

    // Create agreement title
    let agreementTitle = document.createElement("h1");
    agreementTitle.id = "agreementTitle";
    agreementTitle.textContent = "Terms and Conditions";
    overlayText.appendChild(agreementTitle);

    // Create agreement text
    let agreementText = document.createElement("p");
    agreementText.id = "agreementText";
    agreementText.textContent = "By creating an account, you agree to the terms and conditions of the Software Development Club. These terms include but are not limited to: not sharing your account information with others, not using the account for malicious purposes, and not using the account to break any laws. If you do not agree to these terms, you will not be able to create an account.";
    overlayText.appendChild(agreementText);
}
