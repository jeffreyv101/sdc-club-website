window.addEventListener('resize', function() {
    const clubNameElement = document.getElementById('clubName');
    if (window.innerWidth < 552) {
        clubNameElement.textContent = 'SDC';
    } else {
        clubNameElement.textContent = 'Software Development Club';
    }
});

// Initial check when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const clubNameElement = document.getElementById('clubName');
    if (window.innerWidth < 552) {
        clubNameElement.textContent = 'SDC';
    } else {
        clubNameElement.textContent = 'Software Development Club';
    }
});