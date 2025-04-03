import React, { useState, useEffect } from 'react';

const moodEmojis = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😃', label: 'Excited' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😕', label: 'Worried' },
  { emoji: '😢', label: 'Sad' }
];

const recommendations = [
  {
    title: 'Quick Meditation',
    description: 'Take a 5-minute mindfulness break',
    icon: '🧘‍♂️'
  },
  {
    title: 'Journaling',
    description: 'Write down your thoughts and feelings',
    icon: '📝'
  },
  {
    title: 'Deep Breathing',
    description: 'Practice calming breath exercises',
    icon: '🫁'
  },
  {
    title: 'Physical Activity',
    description: 'Take a short walk or stretch',
    icon: '🚶‍♂️'
  }
];

const HomeScreen = ({ onNavigate, user }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    const savedCheckIn = localStorage.getItem('lastCheckIn');
    if (savedCheckIn) {
      setLastCheckIn(new Date(savedCheckIn));
    }
  }, []);

  const handleMoodSelection = (index) => {
    setSelectedMood(index);
    localStorage.setItem('lastCheckIn', new Date().toISOString());
    setLastCheckIn(new Date());
  };

  const getTimeAgo = (date) => {
    if (!date) return '';
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
            {greeting}, {user?.name || 'Friend'}!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            How are you feeling today?
          </p>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              {moodEmojis.map((mood, index) => (
                <button
                  key={index}
                  onClick={() => handleMoodSelection(index)}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                    selectedMood === index 
                      ? 'bg-blue-100 dark:bg-blue-900 transform scale-110' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-4xl mb-2">{mood.emoji}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{mood.label}</span>
                </button>
              ))}
            </div>
            {lastCheckIn && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Last check-in: {getTimeAgo(lastCheckIn)}
              </p>
            )}
          </div>

          <button
            onClick={() => onNavigate('chat')}
            className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                     shadow-lg hover:shadow-xl transition-all duration-200 text-lg font-semibold
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            QHACK NOW
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 
                         dark:hover:bg-gray-700 cursor-pointer transition-colors group"
              >
                <div className="flex items-start space-x-4">
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {rec.icon}
                  </span>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white mb-1">
                      {rec.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {rec.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
