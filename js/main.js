// Main JavaScript for TechBootcamp Website

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeCounters();
    initializeScrollEffects();
    initializeCarousel();
});

// GSAP Animations
function initializeAnimations() {
    // Hero section animations
    gsap.from('.hero-content h1', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.hero-content p', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.from('.hero-content .d-flex', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.6,
        ease: 'power3.out'
    });

    // Code animation
    gsap.from('.code-animation', {
        duration: 1,
        x: 50,
        opacity: 0,
        delay: 0.8,
        ease: 'power3.out'
    });

    // Learning paths scroll animation
    gsap.utils.toArray('.learning-path-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // Stats section animation
    gsap.from('.stat-card', {
        scrollTrigger: {
            trigger: '.stat-card',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const countUp = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => countUp(counter), 10);
        } else {
            counter.innerText = target;
            if (counter.getAttribute('data-target') === '65') {
                counter.innerText += '%';
            } else if (counter.getAttribute('data-target') === '92') {
                counter.innerText += '%';
            } else {
                counter.innerText += '+';
            }
        }
    };

    // Use Intersection Observer to trigger counter when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(10, 16, 36, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 16, 36, 0.95)';
        }
    });

    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

// Carousel Enhancement
function initializeCarousel() {
    const carousel = document.getElementById('testimonialCarousel');
    if (carousel) {
        // Add custom carousel behavior
        carousel.addEventListener('slide.bs.carousel', function (e) {
            // Add animation to the new slide
            const newSlide = e.relatedTarget;
            const content = newSlide.querySelector('.testimonial-content');
            
            gsap.from(content, {
                duration: 0.6,
                y: 30,
                opacity: 0,
                ease: 'power2.out'
            });
        });
    }
}

// Button Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
});

// Mobile Dropdown Fix
document.addEventListener('DOMContentLoaded', function() {
    // Handle mobile dropdown clicks more reliably
    const dropdownToggles = document.querySelectorAll('.navbar-nav .dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only apply custom behavior on mobile devices
            if (window.innerWidth <= 991.98) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.parentElement;
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                const isShowing = dropdown.classList.contains('show');
                
                // Close all other dropdowns first
                document.querySelectorAll('.navbar-nav .dropdown').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('show');
                        const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                        if (otherMenu) {
                            otherMenu.style.display = 'none';
                        }
                    }
                });
                
                // Toggle current dropdown with proper state management
                if (!isShowing) {
                    dropdown.classList.add('show');
                    if (dropdownMenu) {
                        dropdownMenu.style.display = 'block';
                        // Add a small delay to ensure proper rendering
                        setTimeout(() => {
                            dropdownMenu.style.opacity = '1';
                        }, 10);
                    }
                } else {
                    dropdown.classList.remove('show');
                    if (dropdownMenu) {
                        dropdownMenu.style.opacity = '0';
                        setTimeout(() => {
                            dropdownMenu.style.display = 'none';
                        }, 150);
                    }
                }
            }
        });
    });
    
    // Handle window resize to reset mobile dropdown states
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 991.98) {
                // Reset mobile dropdown styles on desktop
                document.querySelectorAll('.navbar-nav .dropdown-menu').forEach(menu => {
                    menu.style.display = '';
                    menu.style.opacity = '';
                });
                document.querySelectorAll('.navbar-nav .dropdown').forEach(dropdown => {
                    dropdown.classList.remove('show');
                });
            }
        }, 250);
    });
    
    // Close dropdowns when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 991.98) {
            const navbar = document.querySelector('.navbar');
            if (!navbar.contains(e.target)) {
                document.querySelectorAll('.navbar-nav .dropdown').forEach(dropdown => {
                    dropdown.classList.remove('show');
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.style.display = 'none';
                        dropdownMenu.style.opacity = '0';
                    }
                });
            }
        }
    });
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Validation (for login/register pages)
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        });

        if (isValid) {
            // Show success message
            showNotification('Form submitted successfully!', 'success');
        } else {
            showNotification('Please fill in all required fields.', 'error');
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: '#F5F7FB',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });

    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#00E5C4';
        notification.style.color = '#0A1024';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ff4757';
    } else {
        notification.style.backgroundColor = '#00E5C4';
        notification.style.color = '#0A1024';
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Loading State
function showLoading(element) {
    element.classList.add('loading');
    element.disabled = true;
}

function hideLoading(element) {
    element.classList.remove('loading');
    element.disabled = false;
}



// Mobile Menu Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            setTimeout(() => {
                if (navbarCollapse.classList.contains('show')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }, 100);
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
                document.body.style.overflow = '';
            });
        });
    }
});
