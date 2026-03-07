const postsDiv = document.getElementById("posts");
const paginationDiv = document.getElementById("pagination");

let posts = [];
const perPage = 5;

const getData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  posts = await res.json();
  showPage(1);
  setupPagination();
};

const showPage = (page) => {
  postsDiv.innerHTML = "";
  const start = (page - 1) * perPage;
  const end = start + perPage;
  posts.slice(start, end).forEach(post => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `<h4>${post.title}</h4><p>${post.body}</p>`;
    postsDiv.appendChild(div);
  });
};

const setupPagination = () => {
  paginationDiv.innerHTML = "";
  const pageCount = Math.ceil(posts.length / perPage);
  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.addEventListener("click", () => showPage(i));
    paginationDiv.appendChild(btn);
  }
};

getData();