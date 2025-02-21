// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('active'); // Close mobile menu after clicking a link
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Back-to-Top Button (with debounce for performance)
let isScrolling;
window.addEventListener('scroll', () => {
    const backToTopButton = document.querySelector('.back-to-top');
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    }, 100); // Adjust the delay as needed
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Modal for Portfolio Details (dynamic content)
const projects = {
    project1: {
        title: 'Project 1',
        description: 'Details about Project 1.'
    },
    project2: {
        title: 'Project 2',
        description: 'Details about Project 2.'
    }
};

function openModal(projectId) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    modalTitle.textContent = projects[projectId].title;
    modalDescription.textContent = projects[projectId].description;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    modal.focus(); // Focus on the modal for accessibility
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}

// Close modal when clicking outside or pressing Escape
window.addEventListener('click', (e) => {
    const modal = document.getElementById('modal');
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Testimonial Carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Add event listeners for next/prev buttons
document.querySelector('.next-button')?.addEventListener('click', nextTestimonial);
document.querySelector('.prev-button')?.addEventListener('click', prevTestimonial);

// Show the first testimonial initially
showTestimonial(currentTestimonial);

// Form Validation and Submission
function validateForm(event) {
    event.preventDefault(); // Prevent form submission

    // Get form inputs
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Get error message elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Reset error messages
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    messageError.style.display = 'none';

    // Validate Name
    if (name === '') {
        nameError.textContent = 'Name is required.';
        nameError.style.display = 'block';
        return;
    }

    // Validate Email
    if (email === '') {
        emailError.textContent = 'Email is required.';
        emailError.style.display = 'block';
        return;
    } else if (!validateEmail(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.display = 'block';
        return;
    }

    // Validate Message
    if (message === '') {
        messageError.textContent = 'Message is required.';
        messageError.style.display = 'block';
        return;
    }

    // If all validations pass, show success message
    const form = document.querySelector('.contact-form');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your message!';
    successMessage.style.display = 'block';
    form.appendChild(successMessage);

    // Clear the form
    form.reset();

    // Hide the success message after 3 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
    
}

// Email Validation Function
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Add event listener for form submission
document.querySelector('.contact-form')?.addEventListener('submit', validateForm);