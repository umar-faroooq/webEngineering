

// let and const
let temp = [32, 39, 29, 23, 30, 25, 38];
const city = "Mirpur";

//  Arrow function for cold days
const getColdDays = (arr) => arr.filter(temp => temp < 30);

//  Class 
class Car {
    constructor(model, price) {
        this.model = model;
        this.price = price;
    }
    details() {
        return `${this.model} -  ${this.price}`;
    }
}

const c1 = new Car("Ferrari", 59459);
const c2 = new Car("Vigo", 4953);


// map() for all cars
let cars = [c1,c2];
let models = cars.map(c => c.model);

//  filter for expensive cars
let expensive = cars.filter(c => c.price > 24324);

console.log("Temperatures:", temp);
console.log("Cold:", getColdDays(temp));
console.log("Expensive cars:", expensive.map(c => c.model));
console.log(c1.details());