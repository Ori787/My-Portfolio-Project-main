"use strict";
// Configuration - In production, use environment variables
const API_KEY = "c5fa44a43739451b96190228231109"; // Consider moving to environment variable
const API_BASE_URL = "https://api.weatherapi.com/v1";
// DOM elements
const searchInput = document.getElementById("searchinput");
const searchButton = document.getElementById("search-button");
const weatherContainer = document.getElementById("weather-container");
const loadingElement = document.getElementById("loading");
const errorElement = document.getElementById("error");
const errorMessage = document.getElementById("error-message");
// Weather display elements
const elements = {
    cityName: document.getElementById("city-name"),
    countryName: document.getElementById("country-name"),
    weatherIcon: document.getElementById("weather-icon"),
    temperature: document.getElementById("temperature"),
    weatherDescription: document.getElementById("weather-description"),
    feelsLike: document.getElementById("feels-like"),
    humidity: document.getElementById("humidity"),
    windSpeed: document.getElementById("wind-speed"),
    visibility: document.getElementById("visibility"),
};
/**
 * Validates if all required DOM elements are present
 */
function validateElements() {
    const requiredElements = [
        searchInput,
        weatherContainer,
        loadingElement,
        errorElement,
        ...Object.values(elements),
    ];
    return requiredElements.every((element) => element !== null);
}
/**
 * Shows loading state
 */
function showLoading() {
    if (loadingElement) {
        loadingElement.classList.remove("hidden");
    }
    if (errorElement) {
        errorElement.classList.add("hidden");
    }
    if (weatherContainer) {
        weatherContainer.classList.add("hidden");
    }
}
/**
 * Hides loading state
 */
function hideLoading() {
    if (loadingElement) {
        loadingElement.classList.add("hidden");
    }
}
/**
 * Shows error message
 */
function showError(message) {
    hideLoading();
    if (errorElement && errorMessage) {
        errorMessage.textContent = message;
        errorElement.classList.remove("hidden");
    }
    if (weatherContainer) {
        weatherContainer.classList.add("hidden");
    }
}
/**
 * Hides error message
 */
function hideError() {
    if (errorElement) {
        errorElement.classList.add("hidden");
    }
}
/**
 * Updates the UI with weather data
 */
function updateUI(data) {
    if (!validateElements()) {
        console.error("Required DOM elements not found");
        return;
    }
    hideLoading();
    hideError();
    // Update location information
    elements.cityName.textContent = data.location.name;
    elements.countryName.textContent = data.location.country;
    // Update weather icon
    elements.weatherIcon.src = `https:${data.current.condition.icon}`;
    elements.weatherIcon.alt = data.current.condition.text;
    // Update temperature and description
    elements.temperature.textContent = `${Math.round(data.current.temp_c)}°C`;
    elements.weatherDescription.textContent = data.current.condition.text;
    // Update weather details
    elements.feelsLike.textContent = `${Math.round(data.current.feelslike_c)}°C`;
    elements.humidity.textContent = `${data.current.humidity}%`;
    elements.windSpeed.textContent = `${data.current.wind_kph} km/h`;
    elements.visibility.textContent = `${data.current.vis_km} km`;
    // Show weather container with animation
    weatherContainer.classList.remove("hidden");
    weatherContainer.classList.add("animate-pop-in");
}
/**
 * Fetches weather data from the API
 */
async function fetchWeather(location) {
    try {
        showLoading();
        const response = await fetch(`${API_BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=no`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if ("error" in data) {
            throw new Error(data.error.message);
        }
        updateUI(data);
    }
    catch (error) {
        console.error("Error fetching weather data:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch weather data";
        showError(errorMessage);
    }
}
/**
 * Handles search functionality
 */
function handleSearch() {
    const location = searchInput.value.trim();
    if (!location) {
        showError("Please enter a city name");
        return;
    }
    fetchWeather(location);
}
/**
 * Initializes the application
 */
function init() {
    if (!validateElements()) {
        console.error("Required DOM elements not found");
        return;
    }
    // Add event listeners
    searchButton.addEventListener("click", handleSearch);
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    });
    // Focus on search input
    searchInput.focus();
}
// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=code.js.map