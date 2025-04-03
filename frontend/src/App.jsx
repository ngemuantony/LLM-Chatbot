import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import HomeScreen from './components/HomeScreen';
import ChatInterface from './components/ChatInterface';
import Resources from './components/Resources';
import Settings from './components/Settings';

const DailyCheckIn = ({ onComplete }) => {
  const handleClick = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Daily Check-In
        </h1>
        <div className="flex justify-center space-x-4 mb-8">
          <span role="img" aria-label="happy" className="text-4xl cursor-pointer hover:transform hover:scale-110 transition-transform">😊</span>
          <span role="img" aria-label="sad" className="text-4xl cursor-pointer hover:transform hover:scale-110 transition-transform">😢</span>
          <span role="img" aria-label="angry" className="text-4xl cursor-pointer hover:transform hover:scale-110 transition-transform">😠</span>
          <span role="img" aria-label="neutral" className="text-4xl cursor-pointer hover:transform hover:scale-110 transition-transform">😐</span>
          <span role="img" aria-label="worried" className="text-4xl cursor-pointer hover:transform hover:scale-110 transition-transform">😟</span>
        </div>
        <button
          onClick={handleClick}
          className="w-full py-3 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 
                   transition-colors duration-200 transform hover:scale-105"
        >
          Click Me
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('daily-check-in');
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleDailyCheckInComplete = () => {
    setCurrentScreen('auth');
  };

  const handleAuthChange = (screen, userData = null) => {
    setCurrentScreen('home');
    setUser(userData || { name: 'Guest' });
  };

  const handleNavigation = (screen) => {
    setCurrentScreen(screen);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('daily-check-in');
    localStorage.removeItem('lastCheckIn');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'daily-check-in':
        return <DailyCheckIn onComplete={handleDailyCheckInComplete} />;
      case 'auth':
        return <Auth onAuthChange={handleAuthChange} />;
      case 'home':
        return <HomeScreen onNavigate={handleNavigation} user={user} />;
      case 'chat':
        return <ChatInterface user={user} />;
      case 'resources':
        return <Resources />;
      case 'settings':
        return <Settings onDarkModeChange={setDarkMode} darkMode={darkMode} />;
      default:
        return <DailyCheckIn onComplete={handleDailyCheckInComplete} />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gray-50 dark:bg-gray-900`}>
      {currentScreen !== 'daily-check-in' && currentScreen !== 'auth' && (
        <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <span className="text-xl font-semibold text-gray-800 dark:text-white">
                  Mental Health Assistant
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleNavigation('home')}
                  className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigation('chat')}
                  className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Chat
                </button>
                <button
                  onClick={() => handleNavigation('resources')}
                  className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Resources
                </button>
                <button
                  onClick={() => handleNavigation('settings')}
                  className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
      
      <main className={`container mx-auto px-4 ${currentScreen !== 'daily-check-in' && currentScreen !== 'auth' ? 'pt-20' : ''}`}>
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;
