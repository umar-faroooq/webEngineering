// Task 3B - Form Validation
// Ayesha - Using ES6 Features

// Get DOM elements (using const)
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const successMessage = document.getElementById('successMessage');

// Password requirement element
const lengthReq = document.getElementById('lengthReq');

// Validation state (using let)
let isNameValid = false;
let isEmailValid = false;
let isPasswordValid = false;

// Email validation using regex (arrow function)
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password validation (arrow function)
const validatePassword = (password) => {
    return password.length >= 8;
};

// Update password requirement style (arrow function)
const updatePasswordRequirement = () => {
    const password = passwordInput.value;
    const isValid = validatePassword(password);
    
    if (password.length > 0) {
        if (isValid) {
            lengthReq.className = 'requirement valid';
            lengthReq.innerHTML = '<i class="fa-solid fa-check-circle"></i> At least 8 characters ✓';
        } else {
            lengthReq.className = 'requirement invalid';
            lengthReq.innerHTML = '<i class="fa-solid fa-circle"></i> At least 8 characters';
        }
    } else {
        lengthReq.className = 'requirement invalid';
        lengthReq.innerHTML = '<i class="fa-solid fa-circle"></i> At least 8 characters';
    }
};

// Real-time validation using arrow functions
nameInput.addEventListener('input', () => {
    const name = nameInput.value.trim();
    
    if (name === '') {
        nameError.style.display = 'block';
        isNameValid = false;
    } else {
        nameError.style.display = 'none';
        isNameValid = true;
    }
    
    updateSubmitButton();
});

emailInput.addEventListener('input', () => {
    const email = emailInput.value.trim();
    
    if (email === '') {
        emailError.style.display = 'block';
        emailError.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Email is required';
        isEmailValid = false;
    } else if (!validateEmail(email)) {
        emailError.style.display = 'block';
        emailError.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Invalid email format';
        isEmailValid = false;
    } else {
        emailError.style.display = 'none';
        isEmailValid = true;
    }
    
    updateSubmitButton();
});

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    updatePasswordRequirement();
    
    if (password === '') {
        passwordError.style.display = 'block';
        isPasswordValid = false;
    } else if (!validatePassword(password)) {
        passwordError.style.display = 'block';
        isPasswordValid = false;
    } else {
        passwordError.style.display = 'none';
        isPasswordValid = true;
    }
    
    updateSubmitButton();
});

// Update submit button state (arrow function)
const updateSubmitButton = () => {
    if (isNameValid && isEmailValid && isPasswordValid) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    } else {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
        submitBtn.style.cursor = 'not-allowed';
    }
};

// Form submit handler (arrow function)
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent actual form submission
    
    // Template literals for success message
    const name = nameInput.value.trim();
    successMessage.style.display = 'block';
    successMessage.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you ${name}! Form submitted successfully!`;
    
    // Optional: Clear form after 3 seconds
    setTimeout(() => {
        form.reset();
        successMessage.style.display = 'none';
        
        // Reset validation states
        nameError.style.display = 'none';
        emailError.style.display = 'none';
        passwordError.style.display = 'none';
        
        // Reset password requirement
        lengthReq.className = 'requirement invalid';
        lengthReq.innerHTML = '<i class="fa-solid fa-circle"></i> At least 8 characters';
        
        isNameValid = false;
        isEmailValid = false;
        isPasswordValid = false;
        updateSubmitButton();
    }, 3000);
});

// Initial state - disable submit button
submitBtn.disabled = true;
submitBtn.style.opacity = '0.6';
submitBtn.style.cursor = 'not-allowed';

// Clear error when user starts typing (already handled above)