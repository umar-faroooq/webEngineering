// Task 4 - Fetch API Data Display (Food Edition)
// Ayesha - Using ES6 Features

// Get DOM elements (using const)
const getMealsBtn = document.getElementById('getMeals');
const getCategoriesBtn = document.getElementById('getCategories');
const getIngredientsBtn = document.getElementById('getIngredients');
const cardViewBtn = document.getElementById('cardView');
const tableViewBtn = document.getElementById('tableView');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorSpan = error.querySelector('span');
const stats = document.getElementById('stats');
const dataType = document.getElementById('dataType');
const totalCount = document.getElementById('totalCount');
const dataDisplay = document.getElementById('dataDisplay');

// State variables (using let)
let currentData = [];
let currentView = 'card';
let currentDataType = '';

// API endpoints for food (using const)
const APIS = {
    meals: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    categories: 'https://www.themealdb.com/api/json/v1/1/categories.php',
    ingredients: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
};

// Update button text in HTML - you need to change button IDs in HTML too!
// In your HTML, change button ids to: getMeals, getCategories, getIngredients

// Toggle view buttons
cardViewBtn.addEventListener('click', () => {
    cardViewBtn.classList.add('active');
    tableViewBtn.classList.remove('active');
    currentView = 'card';
    if (currentData.length > 0) {
        displayData(currentData, currentDataType);
    }
});

tableViewBtn.addEventListener('click', () => {
    tableViewBtn.classList.add('active');
    cardViewBtn.classList.remove('active');
    currentView = 'table';
    if (currentData.length > 0) {
        displayData(currentData, currentDataType);
    }
});

// Fetch MEALS data
const fetchMeals = async () => {
    try {
        showLoading();
        // Fetch some sample meals (chicken, beef, etc.)
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken');
        const data = await response.json();
        hideLoading();
        
        if (data.meals) {
            currentData = data.meals.slice(0, 10); // Get first 10 meals
            currentDataType = 'meals';
            displayData(currentData, 'meals');
            updateStats('Meals (Chicken)', currentData.length);
        } else {
            showError('No meals found');
        }
        
    } catch (err) {
        showError('Failed to fetch meals. Please try again.');
    }
};

// Fetch CATEGORIES data
const fetchCategories = async () => {
    try {
        showLoading();
        const response = await fetch(APIS.categories);
        const data = await response.json();
        hideLoading();
        
        if (data.categories) {
            currentData = data.categories;
            currentDataType = 'categories';
            displayData(data.categories, 'categories');
            updateStats('Food Categories', data.categories.length);
        }
        
    } catch (err) {
        showError('Failed to fetch categories. Please try again.');
    }
};

// Fetch INGREDIENTS data
const fetchIngredients = async () => {
    try {
        showLoading();
        const response = await fetch(APIS.ingredients);
        const data = await response.json();
        hideLoading();
        
        if (data.meals) {
            currentData = data.meals.slice(0, 15); // Get first 15 ingredients
            currentDataType = 'ingredients';
            displayData(data.meals.slice(0, 15), 'ingredients');
            updateStats('Ingredients', 15);
        }
        
    } catch (err) {
        showError('Failed to fetch ingredients. Please try again.');
    }
};

// Display data based on view
const displayData = (data, type) => {
    if (currentView === 'card') {
        displayCardView(data, type);
    } else {
        displayTableView(data, type);
    }
};

// Card view display for FOOD data
const displayCardView = (data, type) => {
    let html = '<div class="data-container">';
    
    data.forEach(item => {
        if (type === 'meals') {
            // Destructuring for meals
            const { strMeal, strCategory, strArea, strInstructions, strMealThumb } = item;
            html += `
                <div class="data-card">
                    <div class="card-header">
                        <i class="fa-solid fa-utensils"></i>
                        <h3>${strMeal}</h3>
                    </div>
                    <div class="card-body">
                        <p><i class="fa-solid fa-tag"></i> Category: ${strCategory}</p>
                        <p><i class="fa-solid fa-globe"></i> Cuisine: ${strArea}</p>
                        <p><i class="fa-solid fa-align-left"></i> ${strInstructions.substring(0, 80)}...</p>
                    </div>
                </div>
            `;
        } else if (type === 'categories') {
            // Destructuring for categories
            const { strCategory, strCategoryThumb, strCategoryDescription } = item;
            html += `
                <div class="data-card">
                    <div class="card-header">
                        <i class="fa-solid fa-layer-group"></i>
                        <h3>${strCategory}</h3>
                    </div>
                    <div class="card-body">
                        <p><i class="fa-solid fa-align-left"></i> ${strCategoryDescription.substring(0, 80)}...</p>
                    </div>
                </div>
            `;
        } else if (type === 'ingredients') {
            // Destructuring for ingredients
            const { strIngredient, strDescription } = item;
            html += `
                <div class="data-card">
                    <div class="card-header">
                        <i class="fa-solid fa-carrot"></i>
                        <h3>${strIngredient}</h3>
                    </div>
                    <div class="card-body">
                        <p><i class="fa-solid fa-align-left"></i> ${strDescription ? strDescription.substring(0, 80) : 'No description available'}</p>
                    </div>
                </div>
            `;
        }
    });
    
    html += '</div>';
    dataDisplay.innerHTML = html;
};

// Table view display for FOOD data
const displayTableView = (data, type) => {
    let html = '<div class="table-container"><table>';
    
    if (type === 'meals') {
        html += `
            <thead>
                <tr>
                    <th>Meal Name</th>
                    <th>Category</th>
                    <th>Cuisine</th>
                </tr>
            </thead>
            <tbody>
        `;
        
        data.forEach(item => {
            const { strMeal, strCategory, strArea } = item;
            html += `
                <tr>
                    <td>${strMeal}</td>
                    <td>${strCategory}</td>
                    <td>${strArea}</td>
                </tr>
            `;
        });
    } else if (type === 'categories') {
        html += `
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
        `;
        
        data.forEach(item => {
            const { strCategory, strCategoryDescription } = item;
            html += `
                <tr>
                    <td>${strCategory}</td>
                    <td>${strCategoryDescription.substring(0, 50)}...</td>
                </tr>
            `;
        });
    } else if (type === 'ingredients') {
        html += `
            <thead>
                <tr>
                    <th>Ingredient</th>
                </tr>
            </thead>
            <tbody>
        `;
        
        data.forEach(item => {
            const { strIngredient } = item;
            html += `
                <tr>
                    <td>${strIngredient}</td>
                </tr>
            `;
        });
    }
    
    html += '</tbody></table></div>';
    dataDisplay.innerHTML = html;
};

// Helper functions
const showLoading = () => {
    loading.style.display = 'block';
    dataDisplay.innerHTML = '';
    stats.style.display = 'none';
    error.style.display = 'none';
};

const hideLoading = () => {
    loading.style.display = 'none';
};

const showError = (message) => {
    hideLoading();
    errorSpan.textContent = message;
    error.style.display = 'block';
    stats.style.display = 'none';
};

const updateStats = (type, count) => {
    dataType.textContent = type;
    totalCount.textContent = count;
    stats.style.display = 'flex';
};

// Event listeners for food buttons
getMealsBtn.addEventListener('click', fetchMeals);
getCategoriesBtn.addEventListener('click', fetchCategories);
getIngredientsBtn.addEventListener('click', fetchIngredients);

// Load meals by default when page loads
window.addEventListener('load', fetchMeals);