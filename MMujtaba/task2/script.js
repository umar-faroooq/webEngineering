// We need a place to save our list of posts once we download them
let allPosts = [];

// We use const for itemsPerPage because it never changes from 5
const itemsPerPage = 5;

// We use let for currentPage because the page number will change when we click Next or Prev
let currentPage = 1;

// Grab our HTML elements so we can use them
const contentDiv = document.getElementById("content");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Here is a simple arrow function that puts 5 items onto the screen
const showPage = () => {
    // Find where our 5 items start and end in the big array
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;

    // Slice out just those 5 items
    let currentItems = allPosts.slice(startIndex, endIndex);

    // Create a string of HTML for these 5 items
    let htmlContent = "";
    currentItems.forEach(post => {
        htmlContent += `<div class="item"><h3>${post.title}</h3></div>`;
    });

    // Load that HTML into our page
    contentDiv.innerHTML = htmlContent;
};

// Use the simplest basic AJAX approach (fetch with .then) to download the data
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => {
        // Save the downloaded data to our array
        allPosts = data;

        // Show the very first page
        showPage();
    });

// Arrow function to handle the Next button click
nextBtn.addEventListener("click", () => {
    // Change to the next page and refresh the screen
    currentPage++;
    showPage();
});

// Arrow function to handle the Previous button click
prevBtn.addEventListener("click", () => {
    // Change to the previous page (but don't go below page 1)
    if (currentPage > 1) {
        currentPage--;
        showPage();
    }
});
