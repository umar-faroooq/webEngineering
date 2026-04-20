// Weather App - Ayesha
// Using OpenWeatherMap API

const apiKey = "Not Yet"; 
let recentCities = [];

// Get weather function
async function getWeather(cityName = null) {
    const city = cityName || document.getElementById("cityInput").value.trim();
    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const weatherCard = document.getElementById("weatherCard");
    
    if (!city) {
        showError("Please enter a city name!");
        return;
    }
    
    // Show loading
    loading.style.display = "block";
    error.style.display = "none";
    weatherCard.style.display = "none";
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || "City not found!");
        }
        
        // Display weather
        displayWeather(data);
        
        // Save to recent searches
        saveRecentCity(city);
        
    } catch (err) {
        showError(err.message);
    } finally {
        loading.style.display = "none";
    }
}

// Display weather
function displayWeather(data) {
    const weatherCard = document.getElementById("weatherCard");
    
    weatherCard.style.display = "block";
    weatherCard.innerHTML = `
        <div class="city-name">${data.name}</div>
        <div class="country">📍 ${data.sys.country}</div>
        
        <div class="temp-section">
            <span class="temperature">${Math.round(data.main.temp)}°C</span>
            <span class="feels-like">Feels like ${Math.round(data.main.feels_like)}°</span>
        </div>
        
        <div class="condition">
            <i>${getWeatherIcon(data.weather[0].main)}</i>
            <span class="condition-text">${data.weather[0].description}</span>
        </div>
        
        <div class="details-grid">
            <div class="detail-item">
                <div class="detail-label">Humidity</div>
                <div class="detail-value">${data.main.humidity}%</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Wind</div>
                <div class="detail-value">${data.wind.speed} m/s</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Pressure</div>
                <div class="detail-value">${data.main.pressure} hPa</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Visibility</div>
                <div class="detail-value">${(data.visibility / 1000).toFixed(1)} km</div>
            </div>
        </div>
    `;
}

// Get weather icon
function getWeatherIcon(weather) {
    const icons = {
        "Clear": "☀️",
        "Clouds": "☁️",
        "Rain": "🌧️",
        "Drizzle": "🌦️",
        "Thunderstorm": "⛈️",
        "Snow": "❄️",
        "Mist": "🌫️",
        "Smoke": "🌫️",
        "Haze": "🌫️",
        "Fog": "🌫️"
    };
    return icons[weather] || "⛅";
}

// Show error
function showError(message) {
    const error = document.getElementById("error");
    error.style.display = "block";
    error.textContent = `❌ ${message}`;
    error.style.backgroundColor = "#fee";
    error.style.color = "#c44";
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        error.style.display = "none";
    }, 3000);
}

// Save recent city
function saveRecentCity(city) {
    if (!recentCities.includes(city.toLowerCase())) {
        recentCities.unshift(city.toLowerCase());
        if (recentCities.length > 5) recentCities.pop();
        updateRecentSearches();
    }
}

// Update recent searches display
function updateRecentSearches() {
    const recentDiv = document.getElementById("recentSearches");
    const recentButtons = document.getElementById("recentButtons");
    
    if (recentCities.length > 0) {
        recentDiv.style.display = "block";
        recentButtons.innerHTML = recentCities.map(city => 
            `<button class="recent-city" onclick="getWeather('${city}')">${city}</button>`
        ).join('');
    }
}

// Allow Enter key
document.getElementById("cityInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") getWeather();
});

// Clear input on focus
document.getElementById("cityInput").addEventListener("focus", function() {
    this.value = "";
});