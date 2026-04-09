// Let's create a blueprint for our students using a class
class Student {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }
}

// We use const here to hold our list of students since we won't be replacing the whole list
const students = [
    new Student("Ali", 85),
    new Student("Ayesha", 45),
    new Student("Saad", 92),
    new Student("Fatima", 55)
];

// We use let for the passing score because a teacher might decide to change it later
let passingScore = 50;

// Let's filter out the students who met or exceeded the passing score
const passedStudents = students.filter(student => student.score >= passingScore);

// Now, we'll extract just the names of those passing students into a new list
const passedNames = passedStudents.map(student => student.name);

// Finally, grab the output container from our HTML and display the results
let outputDiv = document.getElementById("output");
outputDiv.innerHTML = `
    <p><strong>All Student Scores:</strong> ${students.map(s => `${s.name} (${s.score})`).join(', ')}</p>
    <p><strong>Passing Students:</strong> ${passedNames.join(', ')}</p>
`;

// We'll also log the data to the console so we can see what's happening behind the scenes
console.log("All Students:", students);
console.log("Passed Students (Objects):", passedStudents);
console.log("Passed Students (Names):", passedNames);
