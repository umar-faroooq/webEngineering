// ==================== 1. ES6 Features & Classes ====================
(function demoES6() {
    var oldWay = "I'm var";
    let newWay = "I'm let";
    const fixed = "I'm const";

    const square = (num) => num * num;

    class Student {
        constructor(name, marks) {
            this.name = name;
            this.marks = marks;
        }
        display() {
            return `Student: ${this.name}, Marks: ${this.marks}`;
        }
    }

    const student1 = new Student("Ayesha", 92);
    const student2 = new Student("Ali", 78);

    const es6Div = document.getElementById("es6-output");
    es6Div.innerHTML = `
        <strong>let/const/var demo:</strong> ${oldWay}, ${newWay}, ${fixed}<br>
        <strong>Arrow function square(7):</strong> ${square(7)}<br>
        <strong>Student class:</strong> ${student1.display()} | ${student2.display()}
    `;

    console.log("=== ES6 Demo ===");
    console.log("var/let/const:", oldWay, newWay, fixed);
    console.log("Square of 7:", square(7));
    console.log(student1.display(), student2.display());
})();

// ==================== 2. JSON Handling ====================
(function demoJSON() {
    const studentObj = { name: "Ayesha", age: 21, course: "Web Engineering" };
    const jsonString = JSON.stringify(studentObj);
    const parsedObj = JSON.parse(jsonString);

    document.getElementById("json-output").innerHTML = `
        <strong>Original Object:</strong> ${JSON.stringify(studentObj)}<br>
        <strong>JSON String:</strong> ${jsonString}<br>
        <strong>Parsed back:</strong> Name: ${parsedObj.name}, Age: ${parsedObj.age}, Course: ${parsedObj.course}
    `;
    console.log("=== JSON Demo ===", { original: studentObj, jsonString, parsed: parsedObj });
})();

// ==================== 3. Fetch API – Posts ====================
async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        const titles = posts.slice(0, 5).map(post => post.title);
        const html = `<ul>${titles.map(t => `<li>${t}</li>`).join('')}</ul>`;
        document.getElementById("fetch-posts").innerHTML = html;
        console.log("First 5 posts:", titles);
    } catch (error) {
        document.getElementById("fetch-posts").innerHTML = "Failed to fetch posts.";
        console.error(error);
    }
}
fetchPosts();

// ==================== 4. Async & Error Handling ====================
async function fetchUsers(url, targetDivId) {
    const outputDiv = document.getElementById("async-output");
    outputDiv.innerHTML = "Loading...";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const users = await response.json();
        const names = users.slice(0, 5).map(u => u.name).join(", ");
        outputDiv.innerHTML = `<strong>✅ Success (${url}):</strong><br> First 5 users: ${names}`;
        console.log(`Fetched from ${url}:`, users.slice(0,5));
    } catch (error) {
        outputDiv.innerHTML = `<strong>❌ Error (${url}):</strong> ${error.message}`;
        console.error(`Error fetching ${url}:`, error);
    }
}

document.getElementById("fetch-users").addEventListener("click", () => {
    fetchUsers('https://jsonplaceholder.typicode.com/users', 'async-output');
});
document.getElementById("fetch-wrong").addEventListener("click", () => {
    fetchUsers('https://jsonplaceholder.typicode.com/wrong-endpoint', 'async-output');
});

// ==================== 5. React Component ====================
const Counter = () => {
    const [count, setCount] = React.useState(0);
    return React.createElement('div', { className: 'react-counter' },
        React.createElement('h3', null, 'Counter: ', count),
        React.createElement('button', { onClick: () => setCount(count + 1) }, '➕ Increment')
    );
};

const root = ReactDOM.createRoot(document.getElementById("react-root"));
root.render(React.createElement(Counter));