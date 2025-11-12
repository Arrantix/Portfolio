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

// Contact form submission using EmailJS
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

    // Initialize EmailJS
    emailjs.init('5YWZAq6VEsqCpg7Vy');

    // Prepare template parameters
    const templateParams = {
        name: name,
        email: email,
        message: message,
        time: new Date().toLocaleString()
    };

    // Send email
    emailjs.send('service_8xk0ywf', 'template_6697bke', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message sent successfully!');
            // Clear form
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send message. Please try again later.');
        });
}

// Blog expand/collapse functionality
function initBlogFunctionality() {
    const readMoreButtons = document.querySelectorAll('.read-more');
    const closeButtons = document.querySelectorAll('.close-btn');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const articleId = this.getAttribute('data-article');
            const article = document.getElementById(articleId);

            // Hide all other articles
            const allArticles = document.querySelectorAll('.blog-item');
            allArticles.forEach(item => {
                if (item !== article) {
                    item.style.display = 'none';
                }
            });

            // Expand the clicked article
            article.classList.add('expanded');
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const articleId = this.getAttribute('data-article');
            const article = document.getElementById(articleId);

            // Collapse the article
            article.classList.remove('expanded');

            // Show all articles again
            const allArticles = document.querySelectorAll('.blog-item');
            allArticles.forEach(item => {
                item.style.display = 'block';
            });
        });
    });
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

    // Initialize blog functionality
    initBlogFunctionality();
});
