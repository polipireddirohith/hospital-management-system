// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Active link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== APPOINTMENT MODAL =====
const appointmentModal = document.getElementById('appointmentModal');
const appointmentBtn = document.getElementById('appointmentBtn');
const closeModal = document.getElementById('closeModal');
const appointmentForm = document.getElementById('appointmentForm');

// Open modal
appointmentBtn.addEventListener('click', () => {
    appointmentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close modal
closeModal.addEventListener('click', () => {
    appointmentModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal on outside click
appointmentModal.addEventListener('click', (e) => {
    if (e.target === appointmentModal) {
        appointmentModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && appointmentModal.classList.contains('active')) {
        appointmentModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Handle appointment form submission
appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('patientName').value,
        age: document.getElementById('patientAge').value,
        email: document.getElementById('patientEmail').value,
        phone: document.getElementById('patientPhone').value,
        department: document.getElementById('appointmentDept').value,
        date: document.getElementById('appointmentDate').value,
        reason: document.getElementById('appointmentReason').value
    };
    
    // Show success message
    showNotification('Appointment booked successfully! We will contact you soon.', 'success');
    
    // Reset form and close modal
    appointmentForm.reset();
    appointmentModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Log appointment data (in real app, send to backend)
    console.log('Appointment Data:', formData);
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        department: document.getElementById('department').value,
        message: document.getElementById('message').value
    };
    
    // Show success message
    showNotification('Message sent successfully! We will get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Log contact data (in real app, send to backend)
    console.log('Contact Data:', formData);
});

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '✕'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #DC143C 0%, #E91E63 100%)' : '#f44336'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(220, 20, 60, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        max-width: 400px;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-icon {
        width: 24px;
        height: 24px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
    }
`;
document.head.appendChild(style);

// ===== SERVICE CARDS INTERACTION =====
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    const btn = card.querySelector('.service-btn');
    
    btn.addEventListener('click', () => {
        const serviceTitle = card.querySelector('.service-title').textContent;
        showNotification(`Learn more about ${serviceTitle}. Contact us for details!`, 'success');
    });
});

// ===== DOCTOR APPOINTMENT BUTTONS =====
const doctorCards = document.querySelectorAll('.doctor-card');

doctorCards.forEach(card => {
    const btn = card.querySelector('.btn-primary');
    
    btn.addEventListener('click', () => {
        const doctorName = card.querySelector('.doctor-name').textContent;
        appointmentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        showNotification(`Booking appointment with ${doctorName}`, 'success');
    });
});

// ===== SMOOTH SCROLL =====
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

// ===== LOGIN BUTTON =====
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', () => {
    showNotification('Login feature coming soon! Please contact us for assistance.', 'success');
});

// ===== HERO BUTTONS =====
const heroBtns = document.querySelectorAll('.hero-buttons .btn-large');

heroBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.textContent.includes('Book Appointment')) {
            appointmentModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else if (btn.textContent.includes('Watch Video')) {
            showNotification('Video tour coming soon!', 'success');
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
const animatedElements = document.querySelectorAll('.service-card, .department-card, .doctor-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== SET MINIMUM DATE FOR APPOINTMENT =====
const appointmentDateInput = document.getElementById('appointmentDate');
if (appointmentDateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    appointmentDateInput.setAttribute('min', minDate);
}

// ===== FORM VALIDATION =====
function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add real-time validation
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value && !validatePhone(input.value)) {
            input.style.borderColor = '#f44336';
            showNotification('Please enter a valid 10-digit phone number', 'error');
        } else {
            input.style.borderColor = '';
        }
    });
});

const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value && !validateEmail(input.value)) {
            input.style.borderColor = '#f44336';
            showNotification('Please enter a valid email address', 'error');
        } else {
            input.style.borderColor = '';
        }
    });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== CONSOLE MESSAGE =====
console.log('%c🏥 MediCare Plus Hospital Management System', 'color: #DC143C; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to our advanced healthcare platform!', 'color: #E91E63; font-size: 14px;');
console.log('%cFor support, contact: info@medicareplus.com', 'color: #757575; font-size: 12px;');
