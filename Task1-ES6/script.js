// Using let and const
const numbers = [1, 2, 3, 4, 5];
let multiplier = 3;

// Arrow function to multiply numbers
const multiplyNumbers = (arr) => arr.map(num => num * multiplier);

// Filter even numbers
const evenNumbers = numbers.filter(num => num % 2 === 0);

// Class example
class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  intro() {
    return `Hi I am ${this.name} and I am ${this.age}`;
  }
}

const student1 = new Student("Ghulam", 21);

console.log("Multiplied:", multiplyNumbers(numbers));
console.log("Even numbers:", evenNumbers);
console.log(student1.intro());