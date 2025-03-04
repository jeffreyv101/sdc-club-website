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