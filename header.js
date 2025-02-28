window.addEventListener('resize', function() {
    const clubNameElement = document.getElementById('clubName');
    const projectTitle = document.getElementById('projectTitle');
    if (window.innerWidth < 552) {
        projectTitle.textContent = 'Projects';
        clubNameElement.textContent = 'SDC';
    } else {
        projectTitle.textContent = 'Current Projects';
        clubNameElement.textContent = 'Software Development Club';
    }
});

// Initial check when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const clubNameElement = document.getElementById('clubName');
    const projectTitle = document.getElementById('projectTitle');
    if (window.innerWidth < 552) {
        projectTitle.textContent = 'Projects';
        clubNameElement.textContent = 'SDC';
    } else {
        projectTitle.textContent = 'Current Projects';
        clubNameElement.textContent = 'Software Development Club';
    }
});