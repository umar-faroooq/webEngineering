// Get form element
const form = document.getElementById("registerForm");

// Handle form submission using arrow function
form.addEventListener("submit", (event) => {

    // Prevent page reload on submit
    event.preventDefault();

    // Get user input values
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let message = document.getElementById("message");

    // Clear previous message
    message.innerText = "";

    // Check if any field is empty
    if(name === "" || email === "" || password === ""){
        message.innerText = `All fields are required.`;
        message.style.color = "red";
        return;
    }

    // Email validation pattern
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(!email.match(emailPattern)){
        message.innerText = `Invalid email format: ${email}`;
        message.style.color = "red";
        return;
    }

    // Check password length
    if(password.length < 8){
        message.innerText = `Password must be at least ${8} characters long.`;
        message.style.color = "red";
        return;
    }

    // If all validations pass
    message.innerText = `Registration successful for ${name}!`;
    message.style.color = "green";

});