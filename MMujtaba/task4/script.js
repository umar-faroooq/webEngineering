// Let's grab the HTML list exactly where we want to insert our users
const userList = document.getElementById("userList");

// We're using the modern Fetch API to download data from a free public user database
fetch("https://jsonplaceholder.typicode.com/users")
    
    // Once the server responds, we convert the raw data into JSON format using an arrow function
    .then(response => response.json())
    
    // After it's converted to JSON, we can finally look at the list of user objects
    .then(users => {
        // First, let's clear out the "Loading..." text from our HTML
        userList.innerHTML = "";

        // Now, let's step through every single user in the list one by one using an arrow function
        users.forEach(user => {
            
            // Here is ES6 Destructuring in action! Instead of writing 'user.name' and 'user.email'
            // to get the data out piece by piece, we pull name, email, and website right out of the object natively in one step!
            const { name, email, website } = user;
            
            // Now let's use ES6 Template Literals (the backticks) to build our HTML string seamlessly 
            // without using messy plus signs. Notice how we use ${name} to inject our destructured variables!
            let userCardHTML = `
                <li>
                    <strong>Name: ${name}</strong>
                    <span>Email: ${email}</span>
                    <span>Website: ${website}</span>
                </li>
            `;
            
            // Finally, we add this user's HTML card to the big list on the webpage
            userList.innerHTML += userCardHTML;
        });
    })
    
    // If our computer loses internet or the server crashes, this catch block runs and prints the error
    .catch(error => {
        userList.innerHTML = "<li>Sorry, we couldn't load the users right now.</li>";
        console.error("Fetch problem:", error);
    });
