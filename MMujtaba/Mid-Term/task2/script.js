// 1. Create a simple JS object
const student = {
    name: "Khaled",
    age: 20,
    course: "Web Engineering"
};

console.log("Original student object:", student);


// 2. Convert the object to a JSON string 
// (Useful for saving data or sending it over the network)
const jsonString = JSON.stringify(student);

console.log("Converted to JSON string:", jsonString);


// 3. Convert the JSON string back to a regular object 
// (Useful when receiving data from the network)
const parsedStudent = JSON.parse(jsonString);

console.log("Parsed back to an object:", parsedStudent);


// 4. Update the UI to show our results visually
if (typeof document !== "undefined") {
    // We only run this part if we're in a browser! Node.js doesn't have 'document'
    const outputDiv = document.getElementById("json-output");
    if (outputDiv) {
        outputDiv.innerHTML = `Welcome <b>${parsedStudent.name}</b>!<br> Age: ${parsedStudent.age} <br> Course: ${parsedStudent.course}`;
    }
}
