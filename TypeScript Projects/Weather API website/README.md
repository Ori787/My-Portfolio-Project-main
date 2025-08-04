# Weather API Website

A modern, responsive weather application built with TypeScript that provides real-time weather information for any city using the WeatherAPI service.

## Features

- 🌤️ **Real-time Weather Data**: Get current weather conditions for any city
- 🎨 **Dynamic Backgrounds**: Background changes based on weather conditions
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Fast & Lightweight**: Built with modern web technologies
- 🔍 **Smart Search**: Search for any city with instant results
- 🎯 **Error Handling**: Comprehensive error handling with user-friendly messages
- 🌈 **Visual Feedback**: Loading states and smooth animations

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Axios** - HTTP client for API requests
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **WeatherAPI** - Weather data provider

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or download the project**
   ```bash
   cd "JavaScript Projects/Weather API website"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   This will:
   - Compile TypeScript to JavaScript
   - Start a local development server
   - Open the application in your browser

### Alternative: Quick Start

If you just want to run the project without installing dependencies:

1. Open `index.html` in your web browser
2. The application will work with the pre-compiled JavaScript

## Usage

1. **Search for a City**: Type any city name in the search box and press Enter
2. **View Weather Info**: The app displays:
   - Current temperature (with color coding)
   - Weather condition
   - Humidity level
3. **Visual Feedback**: The background changes based on weather conditions

## API Configuration

The application uses the WeatherAPI service. The API key is currently hardcoded in the source code for demonstration purposes.

**For production use:**
- Move the API key to environment variables
- Implement proper API key management
- Consider rate limiting and caching

## Project Structure

```
Weather API website/
├── js/
│   └── code.ts          # Main TypeScript application code
├── Style/
│   └── style.css        # Application styles
├── Assets/
│   └── images/          # Application images and icons
├── index.html           # Main HTML file
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and recompile automatically
- `npm run dev` - Build and start development server
- `npm start` - Build and start the application

## Features in Detail

### Weather Display
- **Temperature**: Shows current temperature in Celsius with color coding
  - Red for temperatures ≥ 27°C
  - Green for temperatures < 27°C
- **Condition**: Displays current weather condition (e.g., "Partly cloudy")
- **Humidity**: Shows current humidity percentage

### Dynamic Backgrounds
The app automatically changes the background based on weather conditions:
- **Sunny/Clear**: Orange to red gradient
- **Cloudy**: Gray gradient
- **Rainy**: Blue gradient
- **Snowy**: Light blue to purple gradient
- **Foggy**: Light gray gradient

### Error Handling
The app provides user-friendly error messages for:
- City not found
- Network errors
- API key issues
- Rate limiting
- General failures

### Responsive Design
- **Desktop**: Full-featured layout with optimal spacing
- **Tablet**: Adjusted sizing for medium screens
- **Mobile**: Single-column layout with touch-friendly elements

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- WeatherAPI for providing weather data
- Axios for HTTP requests
- The TypeScript team for the amazing language

## Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure you have a stable internet connection
3. Verify that the API key is valid
4. Try refreshing the page

---

**Note**: This is a demonstration project. For production use, implement proper security measures, API key management, and error handling. 