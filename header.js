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
        console.log(getCookie('sdcFontSizeOffset'));
        fontSizeOffset.value = getCookie('sdcFontSizeOffset');
    }

    // Set site with previous values
    document.body.style.backgroundColor = backgroundColor.value;
    setForegroundColor();

    document.querySelector('body').style.color = textColor.value;
    document.querySelector('h2').style.fontSize = `${16 + parseInt(fontSizeOffset.value/10)}px`;
    document.querySelector('p').style.fontSize = `${12 + parseInt(fontSizeOffset.value/10)}px`;
});

