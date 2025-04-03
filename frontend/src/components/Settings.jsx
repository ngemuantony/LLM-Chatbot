import React, { useState, useEffect } from 'react';

const Settings = ({ onDarkModeChange, darkMode }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: darkMode,
    language: 'en',
    fontSize: 'medium',
    autoPlayAudio: true,
    notificationSound: true
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(prev => ({ ...prev, ...parsed }));
    }
  }, []);

  const handleToggle = (setting) => {
    setSettings(prev => {
      const newSettings = {
        ...prev,
        [setting]: !prev[setting]
      };
      localStorage.setItem('userSettings', JSON.stringify(newSettings));
      
      if (setting === 'darkMode') {
        onDarkModeChange(newSettings.darkMode);
      }
      
      return newSettings;
    });
  };

  const handleLanguageChange = (value) => {
    setSettings(prev => {
      const newSettings = {
        ...prev,
        language: value
      };
      localStorage.setItem('userSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  const handleFontSizeChange = (value) => {
    setSettings(prev => {
      const newSettings = {
        ...prev,
        fontSize: value
      };
      localStorage.setItem('userSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          Settings & Personalization
        </h2>
        
        <div className="space-y-4">
          {/* Notification Preferences */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">
                Notifications
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage how you receive notifications
              </p>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Enable Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={() => handleToggle('notifications')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                              peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer 
                              dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                              after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                              after:bg-white after:border-gray-300 after:border after:rounded-full 
                              after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                              peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Notification Sound</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notificationSound}
                    onChange={() => handleToggle('notificationSound')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                              peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer 
                              dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                              after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                              after:bg-white after:border-gray-300 after:border after:rounded-full 
                              after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                              peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">
                Appearance
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Customize how the app looks
              </p>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={() => handleToggle('darkMode')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                              peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer 
                              dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                              after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                              after:bg-white after:border-gray-300 after:border after:rounded-full 
                              after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                              peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Font Size
                </label>
                <select
                  value={settings.fontSize}
                  onChange={(e) => handleFontSizeChange(e.target.value)}
                  className="w-full p-2 border rounded-md dark:border-gray-600 dark:bg-gray-700 
                         dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>

          {/* Language & Accessibility */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">
                Language & Accessibility
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Customize language and accessibility options
              </p>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="w-full p-2 border rounded-md dark:border-gray-600 dark:bg-gray-700 
                         dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Auto-play Audio</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoPlayAudio}
                    onChange={() => handleToggle('autoPlayAudio')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                              peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer 
                              dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                              after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                              after:bg-white after:border-gray-300 after:border after:rounded-full 
                              after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                              peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
