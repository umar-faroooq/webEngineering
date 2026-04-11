const output = document.getElementById("output");

//   1. ES6 FEATURES

function runES6(){

// var vs let vs const
var x = 10;
let y = 20;
const z = 30;

// Arrow function
const square = (num) => num * num;

// Class
class Student {
constructor(name, marks){
this.name = name;
this.marks = marks;
}

display(){
return `Name: ${this.name}, Marks: ${this.marks}`;
}
}

const s = new Student("Ghulam Muhammad", 95);

output.innerHTML = `
<h4>ES6 Demo</h4>
<p>var: ${x}, let: ${y}, const: ${z}</p>
<p>Square(5): ${square(5)}</p>
<p>${s.display()}</p>
`;

hideTable();
}

//   2. JSON HANDLING

function runJSON(){

const obj = {
name: "Ghulam Muhammad",
age: 20,
course: "Software Engineering"
};

const json = JSON.stringify(obj);
const parsed = JSON.parse(json);

output.innerHTML = `
<h4>JSON Demo</h4>
<p><strong>JSON:</strong> ${json}</p>
<p><strong>Parsed:</strong> ${parsed.name}, ${parsed.course}</p>
`;

hideTable();
}

//3. FETCH POSTS

function fetchPosts(){

output.innerHTML = "Loading posts...";
hideTable();

fetch("https://jsonplaceholder.typicode.com/posts")

.then(res => res.json())

.then(data => {

let html = "<h4>First 5 Posts</h4>";

data.slice(0,5).forEach(post => {
html += `<p>${post.title}</p>`;
});

output.innerHTML = html;

})

.catch(err => {
output.innerHTML = `<span class="text-danger">${err}</span>`;
});

}

// 4. USERS LIST

function fetchUsersList(){

output.innerHTML = "Loading users...";
hideTable();

fetch("https://jsonplaceholder.typicode.com/users")

.then(res => res.json())

.then(users => {

let html = "<h4>User List</h4>";

users.forEach(user => {
html += `<p>${user.name} (${user.email})</p>`;
});

output.innerHTML = html;

})

.catch(err => {
output.innerHTML = `<span class="text-danger">${err}</span>`;
});

}

//   4. ASYNC + USERS TABLE (Explicitly using ASYNC AWAIT for better readability)

async function fetchUsersTable(){

const table = document.getElementById("userTable");
const tableBody = document.getElementById("tableBody");

output.innerHTML = "Loading users...";
tableBody.innerHTML = "";
table.classList.add("d-none");

try {

const res = await fetch("https://jsonplaceholder.typicode.com/users");
const users = await res.json();

output.innerHTML = "<h4>Users Table</h4>";
table.classList.remove("d-none");

users.forEach(user => {

const {id, name, email, address} = user;

const row = `
<tr>
<td>${id}</td>
<td>${name}</td>
<td>${email}</td>
<td>${address.city}</td>
</tr>
`;

tableBody.innerHTML += row;

});

} catch (err) {

output.innerHTML = `<span class="text-danger">Error: ${err}</span>`;

}

}
 //  4. ERROR HANDLING

function fetchError(){

output.innerHTML = "Loading...";
hideTable();

fetch("https://jsonplaceholder.typicode.com/invalid")

.then(res => res.json())

.then(data => {
output.innerHTML = "This is a forced error demo, but it is handled gracefully!";
})

.catch(err => {
output.innerHTML = `<span class="text-danger">Error handled: ${err}</span>`;
});

}

 //  HELPER

function hideTable(){
document.getElementById("userTable").classList.add("d-none");
}