// Weather API Types and Interfaces
interface WeatherResponse {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
    vis_km: number;
    feelslike_c: number;
  };
}

interface WeatherError {
  error: {
    code: number;
    message: string;
  };
}

// Weather API Configuration
const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual API key
const API_BASE_URL = "https://api.weatherapi.com/v1";

// Weather App Class
class WeatherApp {
  private searchInput: HTMLInputElement | null;
  private searchBtn: HTMLButtonElement | null;
  private weatherContainer: HTMLElement | null;
  private loadingContainer: HTMLElement | null;
  private errorContainer: HTMLElement | null;

  constructor() {
    this.searchInput = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;
    this.searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
    this.weatherContainer = document.querySelector(
      ".weather-container"
    ) as HTMLElement;
    this.loadingContainer = document.querySelector(
      ".loading-container"
    ) as HTMLElement;
    this.errorContainer = document.querySelector(
      ".error-container"
    ) as HTMLElement;

    this.init();
  }

  private init(): void {
    if (!this.searchInput || !this.searchBtn) {
      console.error("Required elements not found");
      return;
    }

    this.setupEventListeners();
    this.hideAllContainers();
  }

  private setupEventListeners(): void {
    if (this.searchBtn) {
      this.searchBtn.addEventListener("click", () => this.handleSearch());
    }

    if (this.searchInput) {
      this.searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.handleSearch();
        }
      });
    }

    // Retry button event listener
    const retryBtn = document.querySelector(".retry-btn") as HTMLButtonElement;
    if (retryBtn) {
      retryBtn.addEventListener("click", () => this.handleSearch());
    }
  }

  private handleSearch(): void {
    if (!this.searchInput) return;

    const location = this.searchInput.value.trim();
    if (!location) {
      this.showError("Please enter a city name");
      return;
    }

    this.fetchWeather(location);
  }

  private async fetchWeather(location: string): Promise<void> {
    if (!this.weatherContainer) {
      console.error("Weather container not found");
      return;
    }

    this.showLoading();
    this.hideError();

    try {
      const url = `${API_BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(
        location
      )}&aqi=no`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: WeatherResponse = await response.json();
      this.updateUI(data);
      this.hideLoading();
    } catch (error) {
      console.error("Weather data fetch failed:", error);
      let errorMessage = "Failed to load weather data. Please try again.";

      if (error instanceof Error) {
        if (error.message.includes("400")) {
          errorMessage =
            "City not found. Please check the spelling and try again.";
        } else if (error.message.includes("401")) {
          errorMessage = "API key error. Please contact support.";
        } else if (error.message.includes("429")) {
          errorMessage =
            "Too many requests. Please wait a moment and try again.";
        }
      }

      this.showError(errorMessage);
      this.hideLoading();
    }
  }

  private updateUI(data: WeatherResponse): void {
    if (!this.weatherContainer) return;

    // Update location info
    const locationName = this.weatherContainer.querySelector(
      ".location-name"
    ) as HTMLElement;
    const locationCountry = this.weatherContainer.querySelector(
      ".location-country"
    ) as HTMLElement;
    const locationTime = this.weatherContainer.querySelector(
      ".location-time"
    ) as HTMLElement;

    if (locationName) locationName.textContent = data.location.name;
    if (locationCountry) locationCountry.textContent = data.location.country;
    if (locationTime) {
      const localTime = new Date(data.location.localtime);
      locationTime.textContent = localTime.toLocaleString();
    }

    // Update current weather
    const temperature = this.weatherContainer.querySelector(
      ".temperature"
    ) as HTMLElement;
    const weatherCondition = this.weatherContainer.querySelector(
      ".weather-condition"
    ) as HTMLElement;
    const weatherIcon = this.weatherContainer.querySelector(
      ".weather-icon"
    ) as HTMLElement;

    if (temperature) temperature.textContent = `${data.current.temp_c}°C`;
    if (weatherCondition)
      weatherCondition.textContent = data.current.condition.text;
    if (weatherIcon)
      weatherIcon.textContent = this.getWeatherIcon(
        data.current.condition.text
      );

    // Update weather details
    const windSpeed = this.weatherContainer.querySelector(
      ".wind-speed"
    ) as HTMLElement;
    const humidity = this.weatherContainer.querySelector(
      ".humidity"
    ) as HTMLElement;
    const visibility = this.weatherContainer.querySelector(
      ".visibility"
    ) as HTMLElement;
    const feelsLike = this.weatherContainer.querySelector(
      ".feels-like"
    ) as HTMLElement;

    if (windSpeed) windSpeed.textContent = `${data.current.wind_kph} km/h`;
    if (humidity) humidity.textContent = `${data.current.humidity}%`;
    if (visibility) visibility.textContent = `${data.current.vis_km} km`;
    if (feelsLike) feelsLike.textContent = `${data.current.feelslike_c}°C`;

    // Show weather container with animation
    this.weatherContainer.classList.remove("hidden");
    this.weatherContainer.classList.add("animate-pop-in");
  }

  private getWeatherIcon(condition: string): string {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
      return "☀️";
    } else if (
      conditionLower.includes("cloudy") ||
      conditionLower.includes("overcast")
    ) {
      return "☁️";
    } else if (
      conditionLower.includes("rain") ||
      conditionLower.includes("drizzle")
    ) {
      return "🌧️";
    } else if (conditionLower.includes("snow")) {
      return "❄️";
    } else if (conditionLower.includes("thunder")) {
      return "⛈️";
    } else if (
      conditionLower.includes("fog") ||
      conditionLower.includes("mist")
    ) {
      return "🌫️";
    } else if (conditionLower.includes("partly cloudy")) {
      return "⛅";
    } else {
      return "🌤️";
    }
  }

  private showLoading(): void {
    if (this.loadingContainer) {
      this.loadingContainer.classList.remove("hidden");
    }
  }

  private hideLoading(): void {
    if (this.loadingContainer) {
      this.loadingContainer.classList.add("hidden");
    }
  }

  private showError(message: string): void {
    if (this.errorContainer) {
      const errorMessage = this.errorContainer.querySelector(
        ".error-message"
      ) as HTMLElement;
      if (errorMessage) {
        errorMessage.textContent = message;
      }
      this.errorContainer.classList.remove("hidden");
    }
  }

  private hideError(): void {
    if (this.errorContainer) {
      this.errorContainer.classList.add("hidden");
    }
  }

  private hideAllContainers(): void {
    if (this.weatherContainer) {
      this.weatherContainer.classList.add("hidden");
    }
    if (this.loadingContainer) {
      this.loadingContainer.classList.add("hidden");
    }
    if (this.errorContainer) {
      this.errorContainer.classList.add("hidden");
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new WeatherApp();
});
