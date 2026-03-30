// First, we use const to grab the form and inputs because the physical elements on the page won't change
const form = document.getElementById("registerForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const messageBox = document.getElementById("messageBox");

// We use an arrow function here to tell the browser what to do when the user clicks 'Sign Up'
form.addEventListener("submit", (event) => {
    // This stops the page from reloading instantly, giving us a chance to inspect the user's data
    event.preventDefault();

    // We use let to store what the user typed since we might want to check it differently later
    let nameValue = nameInput.value;
    let emailValue = emailInput.value;
    let passwordValue = passwordInput.value;

    // Rule 1: First and foremost, we make sure they actually typed something in all boxes
    if (nameValue === "" || emailValue === "" || passwordValue === "") {
        // We use template literals (the backticks) here to inject error messages easily
        messageBox.innerText = `Please make sure you have filled out all the fields!`;
        messageBox.style.color = "red"; // Make it red to look like a warning
        return; // The 'return' stops the code from continuing downwards
    }

    // Rule 2: We use a simple checklist to make sure their email address has an @ and a dot
    if (!emailValue.includes("@") || !emailValue.includes(".")) {
        messageBox.innerText = `Please type a real email address containing an '@' and a '.' symbol.`;
        messageBox.style.color = "red";
        return;
    }

    // Rule 3: We make sure their password isn't super easy to guess by forcing it to be longer than 8 characters
    if (passwordValue.length < 8) {
        messageBox.innerText = `Your password is too short. Please make sure it's at least 8 characters long.`;
        messageBox.style.color = "red";
        return;
    }

    // If the computer made it past all our 'return' roadblocks above, everything is perfect!
    // Using a template literal, we can personally welcome them by injecting nameValue into the message
    messageBox.innerText = `Awesome! Registration was successful for ${nameValue}!`;
    messageBox.style.color = "green"; // Green means good to go
});
