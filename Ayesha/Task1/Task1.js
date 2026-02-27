//  let and const examples

let store_name= "Ayesha's Mart";
let customer_name= "Ayesha";
let shopping_cart= [];

console.log("Welcome to " + store_name + ", " + customer_name + "!");
console.log("customer name: " + customer_name);

// Class exampl
class Product {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }

displayinfo() {
    console.log("Product Name: " + this.name);
    console.log("Price: $" + this.price);
    console.log("Category: " + this.category);
}
}

// Creating products
const product1 = new Product("Maggie", 98, "Food");
const product2 = new Product("pen", 150, "staionary");
const product3 = new Product("eye liner", 50, "Makeup");
const product4 = new Product("shirt", 68, "Clothing");

console.log(product1.displayinfo());
console.log(product2.displayinfo());
console.log(product3.displayinfo());
console.log(product4.displayinfo());

console.log("Products in shopping cart:");


//  Arrow function 
const addToCart = (product,quantity) => {
    shopping_cart.push({product, quantity});
    console.log(quantity + " " + product.name + " added to cart.");

}
addToCart(product1, 2);
addToCart(product2, 13);
addToCart(product3, 3);
addToCart(product4, 8);

console.log("Shopping Cart:");

// map Example
let itemTotals = shopping_cart.map(item => item.product.price * item.quantity);
console.log("Each item total:", itemTotals);

// filter example
let cheapItems = shopping_cart.filter(item => item.product.price < 100);
console.log("Cheap items:", cheapItems.map(i => i.product.name));