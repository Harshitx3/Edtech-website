// Join Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeJoinPage();
    setupEventListeners();
});

function initializeJoinPage() {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = 'dashboard.html';
        return;
    }
}

function setupEventListeners() {
    // Join form submission
    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', handleJoinSubmit);
    }

    // Login form submission (in modal)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    // Forgot password form submission
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPasswordSubmit);
    }

    // Input field animations
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Handle join form submission
async function handleJoinSubmit(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearAllErrors();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Validate form
    if (!validateJoinForm(data)) {
        return;
    }
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoader = submitButton.querySelector('.btn-loader');
    
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    submitButton.disabled = true;
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Store user data in localStorage (for demo purposes)
        localStorage.setItem('userData', JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            education: data.education,
            interests: data.interests,
            experience: data.experience,
            goals: data.goals,
            newsletter: data.newsletter === 'on',
            updates: data.updates === 'on'
        }));
        
        // Show success modal
        showSuccessModal();
        
    } catch (error) {
        showAuthMessage('An error occurred. Please try again.', 'error');
    } finally {
        // Reset button state
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';
        submitButton.disabled = false;
    }
}

// Handle login form submission (in modal)
async function handleLoginSubmit(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearAllErrors();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Validate form
    if (!validateLoginForm(data)) {
        return;
    }
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoader = submitButton.querySelector('.btn-loader');
    
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    submitButton.disabled = true;
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Store login token (for demo purposes)
        localStorage.setItem('token', 'demo-token-' + Date.now());
        localStorage.setItem('userEmail', data.loginEmail);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
        
    } catch (error) {
        showAuthMessage('Login failed. Please try again.', 'error');
    } finally {
        // Reset button state
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';
        submitButton.disabled = false;
    }
}

// Handle forgot password submission
async function handleForgotPasswordSubmit(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearAllErrors();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Validate email
    if (!data.resetEmail || !isValidEmail(data.resetEmail)) {
        showError('resetEmailError', 'Please enter a valid email address');
        return;
    }
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoader = submitButton.querySelector('.btn-loader');
    
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    submitButton.disabled = true;
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showAuthMessage('Password reset link sent to your email!', 'success');
        hideForgotPasswordModal();
        
    } catch (error) {
        showAuthMessage('Failed to send reset link. Please try again.', 'error');
    } finally {
        // Reset button state
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';
        submitButton.disabled = false;
    }
}

// Form validation functions
function validateJoinForm(data) {
    let isValid = true;
    
    // First name validation
    if (!data.firstName || data.firstName.trim().length < 2) {
        showError('firstNameError', 'First name must be at least 2 characters');
        isValid = false;
    }
    
    // Last name validation
    if (!data.lastName || data.lastName.trim().length < 2) {
        showError('lastNameError', 'Last name must be at least 2 characters');
        isValid = false;
    }
    
    // Email validation
    if (!data.email || !isValidEmail(data.email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (data.phone && !isValidPhone(data.phone)) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Education validation
    if (!data.education) {
        showError('educationError', 'Please select your education level');
        isValid = false;
    }
    
    // Experience validation
    if (!data.experience) {
        showError('experienceError', 'Please select your experience level');
        isValid = false;
    }
    
    return isValid;
}

function validateLoginForm(data) {
    let isValid = true;
    
    // Email validation
    if (!data.loginEmail || !isValidEmail(data.loginEmail)) {
        showError('loginEmailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Password validation
    if (!data.loginPassword || data.loginPassword.length < 6) {
        showError('loginPasswordError', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    return isValid;
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

function showAuthMessage(message, type) {
    const messageContainer = document.getElementById('authMessages');
    if (messageContainer) {
        messageContainer.innerHTML = `
            <div class="auth-message ${type}">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.remove()" class="message-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            const messageElement = messageContainer.querySelector('.auth-message');
            if (messageElement) {
                messageElement.remove();
            }
        }, 5000);
    }
}

// Modal functions
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    clearAllErrors();
}

function showForgotPasswordModal() {
    hideLoginModal();
    document.getElementById('forgotPasswordModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideForgotPasswordModal() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    clearAllErrors();
}

function showSuccessModal() {
    document.getElementById('successModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function redirectToDashboard() {
    hideSuccessModal();
    window.location.href = 'dashboard.html';
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggleBtn = input.parentElement.querySelector('.toggle-password i');
    
    if (input.type === 'password') {
        input.type = 'text';
        toggleBtn.classList.remove('fa-eye');
        toggleBtn.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        toggleBtn.classList.remove('fa-eye-slash');
        toggleBtn.classList.add('fa-eye');
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const successModal = document.getElementById('successModal');
    
    if (event.target === loginModal) {
        hideLoginModal();
    }
    if (event.target === forgotPasswordModal) {
        hideForgotPasswordModal();
    }
    if (event.target === successModal) {
        hideSuccessModal();
    }
}