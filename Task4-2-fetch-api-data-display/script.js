// Get DOM elements
const loadBtn = document.getElementById("loadBtn");
const tableBody = document.getElementById("tableBody");
const status = document.getElementById("status");

// Fetch data when button is clicked
loadBtn.addEventListener("click", () => {

status.innerText = "Loading users...";

// Fetch users from API
fetch("https://jsonplaceholder.typicode.com/users")

.then(response => response.json())

.then(users => {

tableBody.innerHTML = "";

// Loop through users and display them
users.forEach(user => {

    // ES6 destructuring
    const {id, name, email, address} = user;

    // Create table row using template literals
    const row = `
    <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${address.city}</td>
    </tr>
    `;

    tableBody.innerHTML += row;

});

status.innerText = `Loaded ${users.length} users successfully.`;

})

.catch(error => {

status.innerText = `Error fetching data: ${error}`;

});

});