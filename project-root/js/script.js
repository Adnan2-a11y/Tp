// js/script.js

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    // Initialize all components
    initMobileMenu();
    initTeacherModals();
    initCourseFilters();
    initTestimonialSlider();
    initScrollEffects();
    initSearchFunctionality();
    initNewsletterForm();
    
    console.log('E-Scholar platform initialized successfully');
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('show');
                mobileToggle.querySelector('i').classList.add('fa-bars');
                mobileToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    });
}

// Teacher Modals
function initTeacherModals() {
    const teacherCards = document.querySelectorAll('.teacher-card');
    const modal = createTeacherModal();
    
    teacherCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.getAttribute('data-name') || this.querySelector('h3').textContent;
            const subject = this.getAttribute('data-subject') || this.querySelector('.teacher-subject').textContent;
            const desc = this.getAttribute('data-desc') || this.querySelector('.teacher-desc').textContent;
            const imgSrc = this.querySelector('.teacher-img').src;
            
            openTeacherModal(modal, name, subject, desc, imgSrc);
        });
    });
}

function createTeacherModal() {
    // Check if modal already exists
    let modal = document.getElementById('teacherModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'teacherModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <div class="modal-img-container">
                    <img id="modalImg" src="" alt="">
                </div>
                <div class="modal-info">
                    <h3 id="modalName"></h3>
                    <h4 id="modalSubject"></h4>
                    <p id="modalDesc"></p>
                    <div class="modal-actions">
                        <button class="btn btn-primary">View Profile</button>
                        <button class="btn btn-secondary">Send Message</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add close functionality
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
    
    return modal;
}

function openTeacherModal(modal, name, subject, desc, imgSrc) {
    modal.querySelector('#modalName').textContent = name;
    modal.querySelector('#modalSubject').textContent = subject;
    modal.querySelector('#modalDesc').textContent = desc;
    modal.querySelector('#modalImg').src = imgSrc;
    modal.querySelector('#modalImg').alt = name;
    
    modal.style.display = 'block';
}

// Course Filters
function initCourseFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.textContent.trim();
            
            // Filter courses
            filterCourses(filterValue, courseCards);
        });
    });
}

function filterCourses(filter, cards) {
    cards.forEach(card => {
        const category = card.querySelector('.course-category').textContent.trim();
        
        if (filter === 'All Courses' || category.includes(filter)) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonialGrid = document.querySelector('.testimonial-grid');
    if (!testimonialGrid) return;
    
    // Convert NodeList to Array for easier manipulation
    const testimonials = Array.from(document.querySelectorAll('.testimonial-card'));
    let currentIndex = 0;
    
    // Only initialize slider if there are multiple testimonials
    if (testimonials.length > 1) {
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonial-dots';
        
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showTestimonial(index));
            dotsContainer.appendChild(dot);
        });
        
        testimonialGrid.parentNode.appendChild(dotsContainer);
        
        // Function to show specific testimonial
        function showTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            
            testimonials[index].style.display = 'block';
            
            // Update active dot
            document.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
        }
        
        // Initially show first testimonial
        showTestimonial(0);
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    }
}

// Scroll Effects
function initScrollEffects() {
    // Add scroll event listener for header
    window.addEventListener('scroll', throttle(handleScroll, 100));
    
    // Initialize scroll animations
    initScrollAnimations();
}

function handleScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .teacher-card, .course-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Search Functionality
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('keyup', throttle(function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
        }
    }, 300));
    
    // Add search icon click event
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
    }
}

function performSearch(query) {
    if (query.trim() === '') return;
    
    // In a real application, this would make an API call
    // For now, we'll just show an alert and log to console
    console.log(`Searching for: ${query}`);
    alert(`Searching for: ${query}\nThis would show results in a real application.`);
    
    // You would typically redirect to a search results page:
    // window.location.href = `pages/search.html?q=${encodeURIComponent(query)}`;
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.footer-col form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            // Simulate form submission
            simulateNewsletterSignup(email);
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function simulateNewsletterSignup(email) {
    // Show loading state
    const submitBtn = document.querySelector('.footer-col form .btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        
        console.log(`Subscribed email: ${email}`);
    }, 1500);
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            .notification.success { background: var(--success); }
            .notification.error { background: var(--accent); }
            .notification.info { background: var(--primary); }
            .notification.show { transform: translateX(0); }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Additional CSS for components
function injectAdditionalStyles() {
    const styles = `
        /* Modal Styles */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            align-items: center;
            justify-content: center;
        }
        
        .modal-content {
            background-color: white;
            border-radius: 12px;
            width: 90%;
            max-width: 500px;
            padding: 30px;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        
        .modal-img-container {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
            margin-bottom: 20px;
        }
        
        .modal-img-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .modal-info h3 {
            color: var(--primary);
            margin-bottom: 10px;
        }
        
        .modal-info h4 {
            color: var(--dark);
            margin-bottom: 15px;
        }
        
        .modal-info p {
            color: var(--gray);
            margin-bottom: 20px;
        }
        
        .modal-actions {
            display: flex;
            gap: 10px;
        }
        
        .close {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: var(--gray);
        }
        
        .close:hover {
            color: var(--dark);
        }
        
        /* Testimonial Dots */
        .testimonial-dots {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            gap: 10px;
        }
        
        .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .dot.active {
            background-color: white;
        }
        
        /* Animation Classes */
        .feature-card, .teacher-card, .course-card, .testimonial-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Mobile Menu Animation */
        @media (max-width: 768px) {
            .nav-menu {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
            }
            
            .nav-menu.show {
                max-height: 300px;
            }
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
}

// Inject additional styles when the document is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAdditionalStyles);
} else {
    injectAdditionalStyles();
}