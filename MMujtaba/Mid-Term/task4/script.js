// 1. Successful Fetch Request
fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => response.json()) // Convert to readable JSON
    .then(user => {
        console.log("Success! Found user:", user.name);

        // Show it on the web page (if we are in a browser)
        if (typeof document !== "undefined") {
            document.getElementById("success-output").innerHTML = `User: <b>${user.name}</b>`;
        }
    })
    .catch(error => {
        console.error("This won't run because the URL is correct!", error);
    });


// 2. Failed Fetch Request (Simulating a totally broken URL)
fetch("https://this-is-a-completely-fake-website.com/api")
    .then(response => response.json()) // This step will fail
    .then(data => {
        console.log("We will never see this line because the fetch failed.");
    })
    .catch(error => {
        // This smoothly catches the broken URL error!
        console.error("Caught an expected network error:", error.message);

        // Show the error on the web page
        if (typeof document !== "undefined") {
            document.getElementById("error-output").innerHTML = `Error Caught: <b>${error.message}</b>`;
        }
    });
