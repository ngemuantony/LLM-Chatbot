# Mental Health Assistant

A modern, responsive web application built with React and Tailwind CSS that provides mental health support through an AI-powered chatbot interface.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Development](#development)
- [Architecture](#architecture)
- [Contributing](#contributing)

## Features

- 🎭 **Daily Mood Check-in**: Track your emotional state with an intuitive emoji-based interface
- 💬 **AI-Powered Chat**: Engage in supportive conversations with an intelligent chatbot
- 📚 **Resource Library**: Access mental health resources and therapeutic exercises
- 🌓 **Dark Mode**: Comfortable viewing experience with automatic theme switching
- 🔒 **Secure**: Built with privacy and security in mind
- 📱 **Responsive**: Works seamlessly on desktop and mobile devices

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mental-health-assistant.git
cd mental-health-assistant
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies (if applicable)
cd ../backend
npm install
```

## Project Structure

```
mental-health-assistant/
├── frontend/                # Frontend React application
│   ├── public/             # Static files
│   ├── src/                # Source files
│   │   ├── components/     # React components
│   │   ├── App.jsx        # Main application component
│   │   └── main.jsx       # Application entry point
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
└── backend/               # Backend services (if applicable)
```

## Usage

1. Start the development server:
```bash
cd frontend
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:5173
```

## Development

### Frontend Development

The frontend is built with:
- React 18.x
- Vite
- Tailwind CSS
- React Router (for navigation)

Key components:
1. **DailyCheckIn**: 
   - Entry point for users
   - Emoji-based mood tracking
   - Daily mood logging

2. **ChatInterface**:
   - Real-time chat with AI
   - Voice input support
   - Message history

3. **Resources**:
   - Therapeutic exercises
   - Professional assistance contacts
   - Educational materials

4. **Settings**:
   - Dark mode toggle
   - Language preferences
   - Notification settings

### Component Architecture

```jsx
App
├── DailyCheckIn
├── Auth
│   ├── Login
│   └── SignUp
├── HomeScreen
│   └── MoodTracker
├── ChatInterface
│   ├── MessageList
│   └── InputArea
├── Resources
│   ├── ExerciseList
│   └── HelpContacts
└── Settings
```

## Architecture

### State Management
- Local state using React's useState for component-level state
- localStorage for persistent settings
- Context API for theme management

### Styling
- Tailwind CSS for utility-first styling
- Dark mode support with class-based theme switching
- Responsive design with mobile-first approach

### Security
- Content Security Policy (CSP) implementation
- Secure API endpoints
- Error boundaries for graceful error handling

## Error Handling

The application implements React Error Boundaries to catch and handle errors gracefully:
- Component-level error isolation
- User-friendly error messages
- Automatic error reporting (if configured)

## Best Practices

1. **Code Organization**:
   - Component-based architecture
   - Separation of concerns
   - Modular CSS with Tailwind

2. **Performance**:
   - Code splitting
   - Lazy loading
   - Optimized build configuration

3. **Accessibility**:
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
