// WeatherAPI.com key
const apiKey = ""
// I will provide key when needed...api key goes in there
// DOM Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const toggleBtn = document.getElementById("toggleView");
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("error");
const weatherResult = document.getElementById("weatherResult");
const jsonView = document.getElementById("jsonView");

// State variables
let currentData = null;
let isJsonVisible = false;

//    Event Listeners
searchBtn.addEventListener("click", getWeather);
toggleBtn.addEventListener("click", toggleView);

//    Fetch Weather Data
async function getWeather() {

    const city = cityInput.value.trim();

    if (!city) {
        errorMsg.innerText = "Please enter a city name.";
        return;
    }

    resetUI();
    loading.style.display = "block";

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        );

        const data = await response.json();

        // API level error handling
        if (!response.ok || data.error) {
            throw new Error(data.error?.message || "City not found.");
        }

        currentData = data;
        displayWeather(data);
        toggleBtn.style.display = "inline-block";

    } catch (error) {
        errorMsg.innerText = error.message;
    } finally {
        loading.style.display = "none";
    }
    resetInput();
  
}

//    Display Normal View
function displayWeather(data) {

    weatherResult.innerHTML = `
        <div class="location">
            ${data.location.name}, ${data.location.country}
        </div>

        <div class="temperature">
            ${data.current.temp_c} °C
        </div>

        <div class="condition">
            <img src="https:${data.current.condition.icon}" alt="Weather icon">
            <span>${data.current.condition.text}</span>
        </div>

        <div class="details">
            <div>Humidity: ${data.current.humidity}%</div>
            <div>Wind Speed: ${data.current.wind_kph} kph</div>
        </div>
    `;
}

//    Toggle JSON View
function toggleView() {

    if (!currentData) return;

    isJsonVisible = !isJsonVisible;

    if (isJsonVisible) {
        jsonView.style.display = "block";
        weatherResult.style.display = "none";
        jsonView.textContent = JSON.stringify(currentData, null, 4);
        toggleBtn.innerText = "View Normal";
    } else {
        jsonView.style.display = "none";
        weatherResult.style.display = "block";
        toggleBtn.innerText = "View JSON";
    }
}

//    Reset UI

function resetUI() {
    errorMsg.innerText = "";
    weatherResult.innerHTML = "";
    jsonView.style.display = "none";
    weatherResult.style.display = "block";
    toggleBtn.style.display = "none";
    isJsonVisible = false;
}
//reset search input on page load
function resetInput() {
    cityInput.value = "";
}
