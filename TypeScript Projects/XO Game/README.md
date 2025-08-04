# Tic-Tac-Toe Game

A modern, beautiful Tic-Tac-Toe game built with TypeScript, featuring a stunning UI design, smooth animations, and excellent user experience.

## ✨ Features

- 🎮 **Modern Gameplay**: Classic Tic-Tac-Toe with a contemporary twist
- 🎨 **Beautiful Design**: Glassmorphism UI with gradient backgrounds and animations
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- ♿ **Accessible**: Full keyboard navigation and screen reader support
- 📊 **Game Statistics**: Track wins, losses, and draws
- 🎯 **Smart Game Logic**: Robust win detection and game state management
- 🌈 **Visual Feedback**: Smooth animations and hover effects
- 🎪 **Interactive Elements**: Modal dialogs and dynamic content updates

## 🛠️ Technologies Used

- **TypeScript** - Type-safe JavaScript for robust code
- **CSS3** - Modern styling with CSS Grid, Flexbox, and custom properties
- **HTML5** - Semantic markup with accessibility features
- **ES6+** - Modern JavaScript features and syntax

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Navigate to the project directory**
   ```bash
   cd "JavaScript Projects/XO Game"
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
   - Start a local development server on port 3001
   - Open the game in your browser

### Alternative: Quick Start

If you just want to play the game without installing dependencies:

1. Open `index.html` in your web browser
2. The game will work with the pre-compiled JavaScript

## 🎮 How to Play

1. **Start the Game**: The game begins with Player X
2. **Take Turns**: Click on any empty cell to place your mark (X or O)
3. **Win Conditions**: Get three of your marks in a row (horizontally, vertically, or diagonally)
4. **Game Controls**:
   - **Reset Game**: Clear the current board and start over
   - **New Game**: Reset all statistics and start fresh
5. **Keyboard Navigation**: Use Tab to navigate and Enter/Space to select cells

## 🎨 Design Features

### Visual Design
- **Glassmorphism**: Translucent elements with backdrop blur effects
- **Gradient Backgrounds**: Beautiful color transitions
- **Floating Animations**: Subtle background elements that move
- **Hover Effects**: Interactive feedback on all clickable elements
- **Smooth Transitions**: Fluid animations throughout the interface

### Color Scheme
- **Primary**: Indigo/Purple gradient for Player X
- **Secondary**: Orange/Amber gradient for Player O
- **Background**: Dynamic gradient that adapts to game state
- **Text**: High contrast white text on dark backgrounds

### Responsive Design
- **Desktop**: Full-featured layout with optimal spacing
- **Tablet**: Adjusted sizing for medium screens
- **Mobile**: Touch-friendly interface with larger touch targets

## 🏗️ Project Structure

```
XO Game/
├── js/
│   └── code.ts          # Main TypeScript game logic
├── style/
│   └── style.css        # Modern CSS styles
├── index.html           # Main HTML file
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## 📋 Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and recompile automatically
- `npm run dev` - Build and start development server
- `npm start` - Build and start the application

## 🎯 Game Features

### Core Gameplay
- **3x3 Grid**: Classic Tic-Tac-Toe board
- **Turn-based**: Alternating X and O players
- **Win Detection**: Automatic detection of winning combinations
- **Draw Detection**: Recognizes when the game is a tie

### User Interface
- **Current Player Display**: Shows whose turn it is
- **Game Statistics**: Tracks wins for each player and draws
- **Result Modal**: Beautiful popup showing game results
- **Control Buttons**: Reset and New Game functionality

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and roles
- **Focus Management**: Clear focus indicators
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user's motion preferences

## 🎨 Customization

### Colors
The game uses CSS custom properties for easy color customization. Edit the `:root` section in `style.css`:

```css
:root {
  --primary: #6366f1;        /* Player X color */
  --secondary: #f59e0b;      /* Player O color */
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* ... more variables */
}
```

### Animations
Customize animations by modifying the keyframes in `style.css`:

```css
@keyframes popIn {
  /* Customize cell appearance animation */
}

@keyframes float {
  /* Customize background floating animation */
}
```

## 🌟 Advanced Features

### TypeScript Benefits
- **Type Safety**: Prevents runtime errors with compile-time checking
- **Better IDE Support**: Enhanced autocomplete and error detection
- **Maintainable Code**: Clear interfaces and type definitions
- **Modern Development**: Latest JavaScript features with type safety

### Performance Optimizations
- **Efficient DOM Updates**: Minimal re-renders
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **Responsive Images**: Optimized for different screen sizes
- **Lazy Loading**: Efficient resource loading

## 🐛 Troubleshooting

### Common Issues

1. **Game not loading**
   - Check browser console for errors
   - Ensure all files are in the correct locations
   - Verify TypeScript compilation completed successfully

2. **Styling issues**
   - Clear browser cache
   - Check if CSS file is loading properly
   - Verify browser supports CSS Grid and Flexbox

3. **TypeScript errors**
   - Run `npm install` to ensure dependencies are installed
   - Check TypeScript version compatibility
   - Verify `tsconfig.json` configuration

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Inter Font**: Beautiful, modern typography
- **CSS Grid & Flexbox**: Modern layout techniques
- **TypeScript Team**: Amazing type-safe JavaScript
- **CSS Custom Properties**: Dynamic theming capabilities

## 📞 Support

If you encounter any issues or have questions:

1. Check the browser console for error messages
2. Verify all files are properly loaded
3. Test in different browsers
4. Check the troubleshooting section above

---

**Enjoy playing Tic-Tac-Toe! 🎮✨** 