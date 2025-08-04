import axios from "axios";

interface WeatherResponse {
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
    humidity: number;
  };
  location: {
    name: string;
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
const DEFAULT_LOCATION = "Rishon Lezion";
const API_BASE_URL = "https://api.weatherapi.com/v1";

// DOM elements
const apiPlace = document.querySelector(".api-place") as HTMLElement | null;
const searchInput = document.querySelector(
  "#searchinput"
) as HTMLInputElement | null;

// Weather display elements
const elements = {
  city: apiPlace?.querySelector(".weather-header h1") as HTMLElement | null,
  temperature: apiPlace?.querySelector(
    ".weather-header h2"
  ) as HTMLElement | null,
  condition: apiPlace?.querySelector(
    ".weather-detail:first-child h3"
  ) as HTMLElement | null,
  humidity: apiPlace?.querySelector(
    ".weather-detail:last-child h4"
  ) as HTMLElement | null,
};

/**
 * Validates if all required DOM elements are present
 */
function validateElements(): boolean {
  const requiredElements = [
    apiPlace,
    elements.city,
    elements.temperature,
    elements.condition,
    elements.humidity,
  ];

  return requiredElements.every((element) => element !== null);
}

/**
 * Updates the UI with weather data
 */
function updateUI(data: WeatherResponse): void {
  if (!validateElements()) {
    console.error("Required DOM elements not found");
    return;
  }

  // Update weather information
  elements.city!.innerText = data.location.name;
  elements.temperature!.innerText = `${data.current.temp_c}°C`;
  elements.condition!.innerText = data.current.condition.text;
  elements.humidity!.innerText = `${data.current.humidity}%`;

  // Change temperature color based on value
  elements.temperature!.style.color =
    data.current.temp_c >= 27 ? "#ff6b6b" : "#51cf66";

  // Update background based on weather condition
  updateBackground(data.current.condition.text);
}

/**
 * Updates the background based on weather condition
 */
function updateBackground(condition: string): void {
  const body = document.body;
  body.className = ""; // Clear existing classes

  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes("sun") || conditionLower.includes("clear")) {
    body.classList.add("sunny");
  } else if (conditionLower.includes("cloud")) {
    body.classList.add("cloudy");
  } else if (
    conditionLower.includes("rain") ||
    conditionLower.includes("drizzle")
  ) {
    body.classList.add("rainy");
  } else if (conditionLower.includes("snow")) {
    body.classList.add("snowy");
  } else if (
    conditionLower.includes("fog") ||
    conditionLower.includes("mist")
  ) {
    body.classList.add("foggy");
  }
}

/**
 * Shows error message in the UI
 */
function showError(message: string): void {
  if (!apiPlace) return;

  apiPlace.innerHTML = `
    <div class="error-container">
      <div class="error-icon">⚠️</div>
      <p class="error-message">${message}</p>
      <button class="retry-btn" onclick="location.reload()">Try Again</button>
    </div>
  `;
}

/**
 * Shows loading state
 */
function showLoading(): void {
  if (!apiPlace) return;

  apiPlace.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading weather data...</p>
    </div>
  `;
}

/**
 * Fetches and displays weather data for the specified location
 */
async function fetchWeather(location: string): Promise<void> {
  if (!apiPlace) {
    console.error("Weather container not found");
    return;
  }

  showLoading();

  try {
    const url = `${API_BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(
      location
    )}&aqi=no`;
    const response = await axios.get<WeatherResponse>(url);

    updateUI(response.data);
  } catch (error) {
    console.error("Weather data fetch failed:", error);

    let errorMessage = "Failed to load weather data. Please try again.";

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        errorMessage =
          "City not found. Please check the spelling and try again.";
      } else if (error.response?.status === 401) {
        errorMessage = "API key error. Please contact support.";
      } else if (error.response?.status === 429) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      } else if (error.code === "NETWORK_ERROR") {
        errorMessage = "Network error. Please check your internet connection.";
      }
    }

    showError(errorMessage);
  }
}

/**
 * Handles search input
 */
function handleSearch(): void {
  if (!searchInput) return;

  const location = searchInput.value.trim();
  if (location) {
    fetchWeather(location);
  }
}

/**
 * Initializes the application
 */
function init(): void {
  // Validate DOM elements
  if (!validateElements()) {
    console.error("Required DOM elements not found. Check HTML structure.");
    return;
  }

  // Initial fetch
  fetchWeather(DEFAULT_LOCATION);

  // Setup search functionality
  if (searchInput) {
    // Handle Enter key
    searchInput.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    });

    // Handle search icon click (if you want to add this functionality)
    const searchIcon = document.querySelector(".searchimg");
    if (searchIcon) {
      searchIcon.addEventListener("click", handleSearch);
    }
  }

  // Add some helpful console info
  console.log("Weather App initialized successfully!");
}

// Start the app when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
