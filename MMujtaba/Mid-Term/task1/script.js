// 1. var, let, and const differences

// 'var' is the old way. It ignores block scopes (like if-statements) and can be reassigned.
var oldVar = "I can be changed anywhere";
oldVar = "Changed!";

// 'let' is the new way. It respects blocks (stays inside {}) and can be reassigned.
let modernLet = "I can change, but I stay in my block";
modernLet = "Changed!";

// 'const' is also new. It respects blocks but CANNOT be reassigned.
const strictConst = "I never change";
// strictConst = "This breaks the code!";

if (true) {
    var escapes = "I leak out of this block!";
    let trappedLet = "I stay inside.";
    const trappedConst = "I also stay inside.";
}


// 2. Practical use

const maxScore = 100; // Use const for fixed settings
let currentScore = 50; // Use let for things that change, like a live score
currentScore += 10; 


// 3. Arrow function (a shorter way to write functions)

const getSquare = (num) => num * num;
console.log("Square of 5 is:", getSquare(5));


// 4. Student Class blueprint

class Student {
    constructor(name, marks) {
        this.name = name;
        this.marks = marks;
    }

    // Quick method to print out the details
    display() {
        // Using backticks (`) for clean and easy string formatting
        console.log(`Student: ${this.name}, Marks: ${this.marks}`);
    }
}

// Let's create a student and test it!
const student1 = new Student("Khaled", 95);
student1.display();
