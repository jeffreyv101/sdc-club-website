const backgroundColor = document.getElementById('bg-color');
const textColor = document.getElementById('text-color');
const fontSizeOffset = document.getElementById('font-size-offset');

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

backgroundColor.addEventListener('change', function(event) {
    document.body.style.backgroundColor = backgroundColor.value;

    // Calculate a contrasting text color
    // Simple algorithm: if the background is dark, use light text, and vice versa
    // This is a very basic approach and might not work perfectly for all colors
    // More advanced algorithms can be used for better contrast
    if (backgroundColor.value === '0xffffff') {
        document.getElementById('content').style.backgroundColor = 'white';
    }
    else {
        let bgColor = backgroundColor.value;
        let bgColorInt = parseInt(bgColor.slice(1), 16);
        let fgColorInt = bgColorInt + 0x0b0b0b;
        let fgColor = `#${fgColorInt.toString(16).padStart(6, '0')}`;

        document.getElementById('content').style.backgroundColor = fgColor;
    }
});

textColor.addEventListener('change', function(event){
    document.querySelector('body').style.color = textColor.value;

}); 

fontSizeOffset.addEventListener('change', function(event){
    
    document.querySelector('h2').style.fontSize = `${16 + parseInt(fontSizeOffset.value/10)}px`;
    document.querySelector('p').style.fontSize = `${12 + parseInt(fontSizeOffset.value/10)}px`
});