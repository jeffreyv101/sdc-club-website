const backgroundColor = document.getElementById('bg-color');
const textColor = document.getElementById('text-color');
const fontSizeOffset = document.getElementById('font-size-offset');

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

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function showSettingsDialog() {
    let settingsIcon = document.getElementById('settings-icon');
    let settingsDialog = document.getElementById("settingsDialog");

    settingsDialog.style.display = 'block';
    settingsIcon.onclick = hideSettingsDialog;
}

function hideSettingsDialog() {
    let settingsIcon = document.getElementById('settings-icon');

    document.getElementById('settingsDialog').style.display='none';
    settingsIcon.onclick = showSettingsDialog;
}

function setForgroundColor() {
    // Calculate a contrasting text color
    // Simple algorithm: if the background is dark, use light text, and vice versa
    // This is a very basic approach and might not work perfectly for all colors
    // More advanced algorithms can be used for better contrast
    if (backgroundColor.value === '0xffffff' || backgroundColor.value === '0xff') {
        document.getElementById('content').style.backgroundColor = 'white';
    }
    else {
        let bgColor = backgroundColor.value;
        let bgColorInt = parseInt(bgColor.slice(1), 16);
        let fgColorInt = bgColorInt + 0x0b0b0b;
        let fgColor = `#${fgColorInt.toString(16).padStart(6, '0')}`;

        document.getElementById('content').style.backgroundColor = fgColor;
    }
}

backgroundColor.addEventListener('change', function(event) {
    document.body.style.backgroundColor = backgroundColor.value;

    setCookie('sdcBackgroundColor', backgroundColor.value, 2);

    setForgroundColor(backgroundColor.value);
});

textColor.addEventListener('change', function(event){
    document.querySelector('body').style.color = textColor.value;

    setCookie('sdcTextColor', textColor.value, 2);
}); 

fontSizeOffset.addEventListener('change', function(event){
    setCookie('sdcTextColor', fontSizeOffset.value, 2);
    document.querySelector('h2').style.fontSize = `${16 + parseInt(fontSizeOffset.value/10)}px`;
    document.querySelector('p').style.fontSize = `${12 + parseInt(fontSizeOffset.value/10)}px`
});


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
setForgroundColor();

document.querySelector('body').style.color = textColor.value;
document.querySelector('h2').style.fontSize = `${16 + parseInt(fontSizeOffset.value/10)}px`;
document.querySelector('p').style.fontSize = `${12 + parseInt(fontSizeOffset.value/10)}px`;