// Function to load HTML content into an element
function loadHTML(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

// Load header and footer on page load
document.addEventListener('DOMContentLoaded', function() {
    loadHTML('header.html', 'header-placeholder');
    loadHTML('footer.html', 'footer-placeholder');
});
