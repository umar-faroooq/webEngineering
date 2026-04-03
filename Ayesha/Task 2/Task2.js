const studentsDiv = document.getElementById("students");
const paginationDiv = document.getElementById("pagination");

let students = [];
const perPage = 5;

const getData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  students = await res.json();
  showPage(1);
  setupPagination();
};

const showPage = (page) => {
  studentsDiv.innerHTML = "";
  const start = (page - 1) * perPage;
  const end = start + perPage;
  
  students.slice(start, end).forEach(student => {
    const div = document.createElement("div");
    div.className = "student";
    div.innerHTML = `<strong>${student.id}.</strong> ${student.name}`;
    studentsDiv.appendChild(div);
  });
};

const setupPagination = () => {
  paginationDiv.innerHTML = "";
  const pageCount = Math.ceil(students.length / perPage);
  
  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.addEventListener("click", () => showPage(i));
    paginationDiv.appendChild(btn);
  }
};

getData();