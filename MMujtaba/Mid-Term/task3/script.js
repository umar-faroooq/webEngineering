// Grab the output box from our HTML (safely checking if we're in the browser)
const outputBox = typeof document !== "undefined" ? document.getElementById("posts-output") : null;

// 1. Fetch data directly from the web URL
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
        // 2. Convert the raw response into readable JSON
        return response.json();
    })
    .then(posts => {
        // 3. We only want the first 5 posts
        const firstFive = posts.slice(0, 5);

        // Clear out the "Loading..." text
        if (outputBox) outputBox.innerHTML = "";

        // 4. Loop through our 5 posts and display their titles
        firstFive.forEach((post, index) => {
            console.log(`Post ${index + 1}:`, post.title); // Log it for beginners
            
            // Add the title directly to our HTML page!
            if (outputBox) outputBox.innerHTML += `<div class="post-title"><strong>${index + 1}.</strong> ${post.title}</div>`;
        });
    })
    .catch(error => {
        // If something goes wrong (like no internet!), catch it here comfortably
        console.error("Oops! Something went wrong:", error);
        if (outputBox) outputBox.innerHTML = "<p style='color: red;'>Failed to load posts. Check console!</p>";
    });
