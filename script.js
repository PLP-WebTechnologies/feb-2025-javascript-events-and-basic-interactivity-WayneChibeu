// Image gallery functionality
const images = [
    'https://picsum.photos/400/300?random=1',
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/400/300?random=3',
    'https://picsum.photos/400/300?random=4'
];
let currentImageIndex = 0;

// Event Handling
document.addEventListener('DOMContentLoaded', () => {
    const colorButton = document.getElementById('colorButton');
    const galleryImage = document.getElementById('galleryImage');
    const prevButton = document.getElementById('prevImage');
    const nextButton = document.getElementById('nextImage');
    const form = document.getElementById('registrationForm');

    // Button color change
    colorButton.addEventListener('click', () => {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        colorButton.style.backgroundColor = randomColor;
    });

    // Double click Easter egg
    colorButton.addEventListener('dblclick', () => {
        alert('🎉 You found the secret double-click! 🎉');
    });

    // Image gallery controls
    prevButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        galleryImage.src = images[currentImageIndex];
    });

    nextButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        galleryImage.src = images[currentImageIndex];
    });

    // Form validation
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        // Username validation
        const username = document.getElementById('username');
        if (username.value.length < 3) {
            username.nextElementSibling.textContent = 'Username must be at least 3 characters';
            isValid = false;
        } else {
            username.nextElementSibling.textContent = '';
        }

        // Email validation
        const email = document.getElementById('email');
        if (!validateEmail(email.value)) {
            email.nextElementSibling.textContent = 'Please enter a valid email address';
            isValid = false;
        } else {
            email.nextElementSibling.textContent = '';
        }

        // Password validation
        const password = document.getElementById('password');
        if (!validatePassword(password.value)) {
            password.nextElementSibling.textContent = 'Password must be at least 8 characters';
            isValid = false;
        } else {
            password.nextElementSibling.textContent = '';
        }

        if (isValid) {
            alert('Form submitted successfully! 🎉');
            form.reset();
        }
    });

    // Real-time password validation
    document.getElementById('password').addEventListener('input', function(e) {
        const feedback = this.nextElementSibling;
        if (this.value.length < 8) {
            feedback.textContent = 'Password must be at least 8 characters';
            feedback.style.color = '#ff4444';
        } else {
            feedback.textContent = '✓ Password is valid';
            feedback.style.color = '#4CAF50';
        }
    });

    // Keypress Detection
    const keyDisplay = document.getElementById('keyDisplay');
    document.addEventListener('keypress', (e) => {
        keyDisplay.textContent = e.key;
        keyDisplay.style.animation = 'none';
        keyDisplay.offsetHeight; // Trigger reflow
        keyDisplay.style.animation = 'bounce 0.5s ease';
    });

    // Accordion Functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Remove active class from all headers and contents
            document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                content.classList.add('active');
                header.classList.add('active');
            }
        });
    });

    // Enhanced Form Validation with Animated Feedback
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const feedback = this.nextElementSibling;
            feedback.classList.remove('success', 'error');
            
            switch(this.id) {
                case 'username':
                    if (this.value.length >= 3) {
                        feedback.textContent = '✓ Username is valid';
                        feedback.classList.add('success');
                    } else {
                        feedback.textContent = 'Username must be at least 3 characters';
                        feedback.classList.add('error');
                    }
                    break;
                // ... similar validation for email and password
            }
        });
    });
});