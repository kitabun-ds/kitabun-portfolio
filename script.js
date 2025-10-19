document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    // Close menu when a link is clicked (for mobile)
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
            }
        });
    });

    // --- Back-to-Top Button Functionality ---
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- On-Scroll Animations and Progress Bars ---
    const animateElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in-left, .animate-fade-in-right');
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    // Observer for general fade-in and progress bars
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // General fade-in animation
                element.classList.add('is-visible');

                // Specific About Me animations
                if (element.classList.contains('animate-fade-in-right')) {
                    element.style.animation = 'fadeInRight 1s ease-out forwards';
                }
                if (element.classList.contains('animate-fade-in-left')) {
                    element.style.animation = 'fadeInLeft 1s ease-out forwards';
                }

                // Progress Bar animation
                if (element.classList.contains('skill-category')) {
                    const bars = element.querySelectorAll('.progress-bar');
                    bars.forEach(bar => {
                        // The 'width' is already set in HTML inline style
                        const width = bar.style.width;
                        bar.style.width = '0'; // Reset for animation start
                        // Use a timeout to ensure the reset happens before the transition starts
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 50);
                    });
                }
                
                // Stop observing after animation is triggered
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Apply the observer to all relevant elements
    animateElements.forEach(el => observer.observe(el));
    document.querySelectorAll('.skill-category').forEach(el => observer.observe(el));
});
// --- Contact Formspree Submission ---
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // stop default form submission
        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                document.getElementById('form-success').style.display = 'block';
                form.reset();
            } else {
                alert("Oops! There was a problem submitting your form.");
            }
        }).catch(error => {
            alert("Oops! There was a problem submitting your form.");
        });
    });
}
