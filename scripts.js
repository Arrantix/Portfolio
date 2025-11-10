// Function to load HTML content into an element
function loadHTML(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

// Typing animation
function typeWriter(text, element, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Contact form submission
function handleContactFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate form fields
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Prepare email content
    const subject = encodeURIComponent(`Contact Form Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    // Create mailto link
    const mailtoLink = `mailto:kevinw223@web.de?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';

    alert('Email client opened. Please send the email to complete the contact.');
}

// Load header and footer on page load
document.addEventListener('DOMContentLoaded', function() {
    loadHTML('header.html', 'header-placeholder');
    loadHTML('footer.html', 'footer-placeholder');

    // Start typing animation after a delay
    setTimeout(() => {
        const typingText = document.getElementById('typing-text');
        if (typingText) {
            typeWriter("Let's build the future together!", typingText, 80);
        }
    }, 2000);

    // Add contact form event listener
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
});
