// Function to load HTML content into an element
function loadHTML(url, elementId) {
    return fetch(url)
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

// Generate a simple math captcha question
function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = Math.random() < 0.5 ? '+' : '-';
    const question = `${num1} ${operation} ${num2}`;
    const answer = operation === '+' ? num1 + num2 : num1 - num2;
    return { question, answer };
}

// Initialize captcha for contact forms
function initCaptcha() {
    // Check if captcha has been solved in this session
    const captchaSolved = sessionStorage.getItem('captchaSolved');
    if (captchaSolved === 'true') {
        return;
    }

    // Show modal immediately on page load
    showCaptchaModal();
}

// Show captcha modal
function showCaptchaModal() {
    const modal = document.getElementById('captcha-modal');
    const captchaQuestion = document.getElementById('captcha-question');
    const captchaAnswer = document.getElementById('captcha-answer');
    const captchaSubmit = document.getElementById('captcha-submit');
    const closeModal = document.querySelector('.close-modal');

    if (!modal || !captchaQuestion || !captchaAnswer || !captchaSubmit) return;

    // Generate and display captcha
    const { question, answer } = generateCaptcha();
    const currentLang = document.documentElement.lang;
    const questionText = currentLang === 'de' ? `Was ist ${question}?` : `What is ${question}?`;
    captchaQuestion.textContent = questionText;
    captchaAnswer.dataset.correctAnswer = answer;

    // Show modal
    modal.style.display = 'flex';

    // Handle submit button
    captchaSubmit.onclick = function() {
        const userAnswer = parseInt(captchaAnswer.value.trim());
        const correctAnswer = parseInt(captchaAnswer.dataset.correctAnswer);
        if (isNaN(userAnswer) || userAnswer !== correctAnswer) {
            alert(currentLang === 'de' ? 'Falsche Antwort. Bitte versuchen Sie es erneut.' : 'Wrong answer. Please try again.');
            // Generate new captcha
            const { question: newQuestion, answer: newAnswer } = generateCaptcha();
            const newQuestionText = currentLang === 'de' ? `Was ist ${newQuestion}?` : `What is ${newQuestion}?`;
            captchaQuestion.textContent = newQuestionText;
            captchaAnswer.dataset.correctAnswer = newAnswer;
            captchaAnswer.value = '';
            return;
        }
        // Mark captcha as solved for this session
        sessionStorage.setItem('captchaSolved', 'true');
        modal.style.display = 'none';
    };

    // Handle close button
    closeModal.onclick = function() {
        modal.style.display = 'none';
        // Redirect or prevent form submission - captcha not solved
        alert(currentLang === 'de' ? 'Captcha muss gelöst werden, um fortzufahren.' : 'Captcha must be solved to continue.');
    };

    // Handle clicking outside modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            alert(currentLang === 'de' ? 'Captcha muss gelöst werden, um fortzufahren.' : 'Captcha must be solved to continue.');
        }
    };
}

// Contact form submission using EmailJS
function handleContactFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate form fields
    const currentLang = document.documentElement.lang;
    const alertMessages = {
        en: {
            fillFields: 'Please fill in all fields.',
            invalidEmail: 'Please enter a valid email address.',
            wrongCaptcha: 'Incorrect captcha answer. Please try again.',
            success: 'Message sent successfully!',
            failed: 'Failed to send message. Please try again later.'
        },
        de: {
            fillFields: 'Bitte füllen Sie alle Felder aus.',
            invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
            wrongCaptcha: 'Falsche Captcha-Antwort. Bitte versuchen Sie es erneut.',
            success: 'Nachricht erfolgreich gesendet!',
            failed: 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.'
        }
    };

    const msgs = alertMessages[currentLang] || alertMessages.en;

    if (!name || !email || !message) {
        alert(msgs.fillFields);
        return;
    }

    if (!validateEmail(email)) {
        alert(msgs.invalidEmail);
        return;
    }

    // Check if captcha has been solved in this session
    const captchaSolved = sessionStorage.getItem('captchaSolved');
    if (!captchaSolved || captchaSolved !== 'true') {
        alert(currentLang === 'de' ? 'Bitte lösen Sie zuerst das Captcha.' : 'Please solve the captcha first.');
        showCaptchaModal();
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
            alert(msgs.success);
            // Clear form
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
            if (captchaAnswer) captchaAnswer.value = '';
        }, function(error) {
            console.log('FAILED...', error);
            alert(msgs.failed);
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

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href*="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const hashIndex = href.indexOf('#');
            if (hashIndex !== -1) {
                e.preventDefault();
                const targetId = href.substring(hashIndex + 1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerOffset = 0; // Offset for fixed header and spacing
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}



// Language toggle functionality
function initLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        // Update button appearance based on current language
        updateLanguageButton();

        langToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const currentLang = document.documentElement.lang;
            const currentPath = window.location.pathname;
            const currentHash = window.location.hash;

            let newPath;
            if (currentLang === 'en') {
                // Switch to German
                setLanguageCookie('de');
                if (currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('/')) {
                    newPath = 'index-de.html';
                } else if (currentPath.includes('blog.html')) {
                    newPath = 'blog-de.html';
                } else if (currentPath.includes('contact.html')) {
                    newPath = 'contact-de.html';
                } else if (currentPath.includes('projects.html')) {
                    newPath = 'projects-de.html';
                } else if (currentPath.includes('demos.html')) {
                    newPath = 'demos-de.html';
                } else {
                    newPath = currentPath.replace('.html', '-de.html');
                }
            } else {
                // Switch to English
                setLanguageCookie('en');
                if (currentPath.includes('index-de.html')) {
                    newPath = 'index.html';
                } else if (currentPath.includes('blog-de.html')) {
                    newPath = 'blog.html';
                } else if (currentPath.includes('contact-de.html')) {
                    newPath = 'contact.html';
                } else if (currentPath.includes('projects-de.html')) {
                    newPath = 'projects.html';
                } else if (currentPath.includes('demos-de.html')) {
                    newPath = 'demos.html';
                } else {
                    newPath = currentPath.replace('-de.html', '.html');
                }
            }

            window.location.href = newPath + currentHash;
        });
    }
}

// Update language button appearance based on current language
function updateLanguageButton() {
    const currentLang = document.documentElement.lang;
    const flagSpan = document.querySelector('.flag');
    const langSpan = document.querySelector('.lang');

    if (currentLang === 'en') {
        // English active, German inactive
        flagSpan.textContent = '🇩🇪';
        flagSpan.classList.remove('active');
        langSpan.textContent = 'EN';
        langSpan.classList.add('active');
    } else {
        // German active, English inactive
        flagSpan.textContent = '🇩🇪';
        flagSpan.classList.add('active');
        langSpan.textContent = 'EN';
        langSpan.classList.remove('active');
    }
}

// Enhanced typing animation with multiple messages and language support
function initTypingAnimation() {
    const currentLang = document.documentElement.lang;
    const messages = currentLang === 'de' ? [
        "Lass uns gemeinsam die Zukunft gestalten!",
        "Innovation durch Code.",
        "Digitale Erlebnisse schaffen.",
        "Komplexe Probleme lösen."
    ] : [
        "Let's build the future together!",
        "Innovation through code.",
        "Creating digital experiences.",
        "Solving complex problems."
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingText = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');

    if (!typingText) return;

    function typeWriter() {
        const currentMessage = messages[messageIndex];

        if (!isDeleting) {
            typingText.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentMessage.length) {
                isDeleting = true;
                setTimeout(typeWriter, 2000); // Pause at end
                return;
            }
        } else {
            typingText.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                messageIndex = (messageIndex + 1) % messages.length;
                setTimeout(typeWriter, 500); // Pause before next message
                return;
            }
        }

        setTimeout(typeWriter, isDeleting ? 50 : 100);
    }

    setTimeout(typeWriter, 2000);
}

// Language preference cookie functions
function setLanguageCookie(lang) {
    document.cookie = `preferred-language=${lang}; path=/; max-age=31536000`; // 1 year
}

function getLanguageCookie() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'preferred-language') {
            return value;
        }
    }
    return null;
}

// Initialize show all functionality
function initShowAllFunctionality() {
    const containers = document.querySelectorAll('.show-all-container');

    containers.forEach(container => {
        const sectionName = container.getAttribute('data-section');
        const section = document.getElementById(sectionName);
        if (!section) return;

        // Determine grid class based on section
        let gridClass;
        if (sectionName === 'projects') {
            gridClass = 'projects-grid';
        } else if (sectionName === 'demos') {
            gridClass = 'demos-grid';
        } else if (sectionName === 'blog-preview') {
            gridClass = 'blog-grid';
        }

        const grid = section.querySelector(`.${gridClass}`);
        if (!grid) return;

        const items = grid.children;
        const totalItems = items.length;
        const maxVisible = 6;

        // Only show button if there are more than 6 items
        if (totalItems <= maxVisible) {
            return;
        }

        // Hide items beyond the first 6
        for (let i = maxVisible; i < totalItems; i++) {
            items[i].style.display = 'none';
        }

        // Create show all button
        const currentLang = document.documentElement.lang;
        const showAllText = currentLang === 'de' ? 'Alle anzeigen' : 'Show All';
        const showLessText = currentLang === 'de' ? 'Weniger anzeigen' : 'Show Less';

        const button = document.createElement('button');
        button.className = 'cta-button show-all-btn';
        button.textContent = showAllText;
        button.setAttribute('data-expanded', 'false');

        button.addEventListener('click', function() {
            const isExpanded = this.getAttribute('data-expanded') === 'true';

            if (isExpanded) {
                // Collapse: hide items beyond 6
                for (let i = maxVisible; i < totalItems; i++) {
                    items[i].style.display = 'none';
                }
                this.textContent = showAllText;
                this.setAttribute('data-expanded', 'false');
            } else {
                // Expand: show all items
                for (let i = maxVisible; i < totalItems; i++) {
                    items[i].style.display = 'block';
                }
                this.textContent = showLessText;
                this.setAttribute('data-expanded', 'true');
            }
        });

        container.appendChild(button);
    });
}

// Load header and footer on page load
document.addEventListener('DOMContentLoaded', function() {
    const currentLang = document.documentElement.lang;
    const headerFile = currentLang === 'de' ? 'header-de.html' : 'header.html';

    loadHTML(headerFile, 'header-placeholder');
    loadHTML('footer.html', 'footer-placeholder').then(() => {
        // Initialize language toggle after footer is loaded
        initLanguageToggle();
    });

    // Initialize all enhancements
    initSmoothScrolling();
    initScrollAnimations();
    initParallax();
    initTypingAnimation();

    // Add contact form event listener
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    // Initialize captcha
    initCaptcha();

    // Initialize blog functionality
    initBlogFunctionality();

    // Initialize show all functionality
    initShowAllFunctionality();
});
