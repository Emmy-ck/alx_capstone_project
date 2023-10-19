// Function to validate password
function validatePassword() {
    const password = document.getElementById("password").value;
    const errorElement = document.getElementById("passwordError");

    // Define regular expressions for each password requirement
    const minLengthRegex = /.{8,}/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*]/;

    if (!minLengthRegex.test(password)) {
        errorElement.textContent = "Password must be at least 8 characters long";
        return false;
    } else if (!uppercaseRegex.test(password)) {
        errorElement.textContent = "Password must contain at least one uppercase letter";
        return false;
    } else if (!lowercaseRegex.test(password)) {
        errorElement.textContent = "Password must contain at least one lowercase letter";
        return false;
    } else if (!digitRegex.test(password)) {
        errorElement.textContent = "Password must contain at least one numeric digit";
        return false;
    } else if (!specialCharRegex.test(password)) {
        errorElement.textContent = "Password must contain at least one special character (e.g., !@#$%^&*)";
        return false;
    }

    errorElement.textContent = ""; // Clear error message
    return true;
}

// Function to validate email
function validateEmail() {
    const email = document.getElementById('email').value;
    const errorElement = document.getElementById('emailError');

    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (!emailRegex.test(email)) {
        errorElement.textContent = 'Please enter a valid email address.';
        return false;
    }

    errorElement.textContent = ""; // Clear error message
    return true;
}

// Function to handle form submission and perform validation
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent form submission behavior

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const successElement = document.getElementById('success');
    const nameErrorElement = document.getElementById('nameError');
    const emailErrorElement = document.getElementById('emailError');
    const passwordErrorElement = document.getElementById('passwordError');

    // Reset error messages
    nameErrorElement.textContent = '';
    emailErrorElement.textContent = '';
    passwordErrorElement.textContent = '';

    // Validate name, email, and password
    if (nameInput.value.trim() === '') {
        nameErrorElement.textContent = 'Please fill in the name field.';
    }
    
    if (!validateEmail()) {
        return; // Stop execution if email validation fails
    }

    if (!validatePassword()) {
        return; // Stop execution if password validation fails
    }

    // If all validations pass, display a success message
    successElement.textContent = 'Form submitted successfully!';
}

// Add event listener to the form to call the handleFormSubmit function
document.getElementById('submitForm').addEventListener('submit', handleFormSubmit);
