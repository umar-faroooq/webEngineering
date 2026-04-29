// 1. Let's create an ES6 Class blueprint to define what a Note looks like
class Note {
    constructor(text) {
        this.text = text;
        this.id = Date.now(); // The exact time becomes our unique ID number
    }
}

// 2. We use 'let' because our list of notes will change.
// LocalStorage only saves Text, so we use JSON.parse() to turn it back into a real Array.
// If LocalStorage is completely empty (null), we just start with a brand new empty [] array!
let myNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];

// 3. Grab our physical HTML elements so Javascript can talk to them
const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");

// 4. This arrow function clears the screen and redraws all our notes
const renderNotes = () => {
    // First, we wipe the grid clean
    let htmlContent = "";

    // We use the forEach() array method to loop through and build HTML for every single note
    myNotes.forEach(note => {
        // We use ES6 Template Literals (the backticks) to inject our note text and ID straight into the HTML
        htmlContent += `
            <div class="note-card">
                <div class="note-text">${note.text}</div>
                <button class="delete-btn" id="deleteBtn-${note.id}">Delete</button>
            </div>
        `;
    });

    // Pushing the raw HTML string onto the screen all at once!
    notesContainer.innerHTML = htmlContent;

    // After the HTML exists on the screen, we loop one more time to make the "Delete" buttons actually do something
    myNotes.forEach(note => {
        // Arrow function for listening to the exact button we clicked
        document.getElementById(`deleteBtn-${note.id}`).addEventListener("click", () => {
            
            // We use the advanced ES6 array filter() method to delete the note.
            // It creates a new list keeping everything EXCEPT the note we clicked!
            myNotes = myNotes.filter(item => item.id !== note.id);
            
            // Once we've deleted it from our Javascript array, we MUST quickly save it to the hard drive
            saveNotesToBrowser();
            
            // Redraw the screen so the deleted note vanishes visually!
            renderNotes();
        });
    });
};

// This small arrow function handles saving our array to the computer's hard drive
const saveNotesToBrowser = () => {
    // LocalStorage ONLY understands strings. So we use JSON.stringify() to turn our array into text!
    localStorage.setItem("savedNotes", JSON.stringify(myNotes));
};

// 5. Arrow function that listens to our main 'Add Note' button
addBtn.addEventListener("click", () => {
    // We make sure they didn't just type empty spaces
    if (noteInput.value.trim() !== "") {
        
        // We use our ES6 Class blueprint from Step 1 to make a new note!
        let newNote = new Note(noteInput.value);
        
        // We push it straight into our array
        myNotes.push(newNote);
        
        // We MUST save it physically to the hard drive so it survives a page refresh!
        saveNotesToBrowser();
        
        // Clear the text box for the next note
        noteInput.value = "";
        
        // Finally, redraw the screen so out new note pops up!
        renderNotes();
    }
});

// VERY IMPORTANT: As soon as the page loads, we need to run renderNotes() right away!
// This guarantees that any saved hard-drive notes appear instantly when the user visits the site.
renderNotes();
