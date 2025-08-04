interface WeatherResponse {
  current: {
    temp_c: number;
    feelslike_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    vis_km: number;
  };
  location: {
    name: string;
    country: string;
  };
}

interface WeatherError {
  error: {
    code: number;
    message: string;
  };
}

// Configuration - In production, use environment variables
const API_KEY = "c5fa44a43739451b96190228231109"; // Consider moving to environment variable
const API_BASE_URL = "https://api.weatherapi.com/v1";

// DOM elements
const searchInput = document.getElementById("searchinput") as HTMLInputElement;
const searchButton = document.getElementById("search-button") as HTMLElement;
const weatherContainer = document.getElementById(
  "weather-container"
) as HTMLElement;
const loadingElement = document.getElementById("loading") as HTMLElement;
const errorElement = document.getElementById("error") as HTMLElement;
const errorMessage = document.getElementById("error-message") as HTMLElement;

// Weather display elements
const elements = {
  cityName: document.getElementById("city-name") as HTMLElement,
  countryName: document.getElementById("country-name") as HTMLElement,
  weatherIcon: document.getElementById("weather-icon") as HTMLImageElement,
  temperature: document.getElementById("temperature") as HTMLElement,
  weatherDescription: document.getElementById(
    "weather-description"
  ) as HTMLElement,
  feelsLike: document.getElementById("feels-like") as HTMLElement,
  humidity: document.getElementById("humidity") as HTMLElement,
  windSpeed: document.getElementById("wind-speed") as HTMLElement,
  visibility: document.getElementById("visibility") as HTMLElement,
};

/**
 * Validates if all required DOM elements are present
 */
function validateElements(): boolean {
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
function showLoading(): void {
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
function hideLoading(): void {
  if (loadingElement) {
    loadingElement.classList.add("hidden");
  }
}

/**
 * Shows error message
 */
function showError(message: string): void {
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
function hideError(): void {
  if (errorElement) {
    errorElement.classList.add("hidden");
  }
}

/**
 * Updates the UI with weather data
 */
function updateUI(data: WeatherResponse): void {
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
async function fetchWeather(location: string): Promise<void> {
  try {
    showLoading();

    const response = await fetch(
      `${API_BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(
        location
      )}&aqi=no`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WeatherResponse | WeatherError = await response.json();

    if ("error" in data) {
      throw new Error(data.error.message);
    }

    updateUI(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch weather data";
    showError(errorMessage);
  }
}

/**
 * Handles search functionality
 */
function handleSearch(): void {
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
function init(): void {
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
