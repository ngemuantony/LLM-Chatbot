import React, { useState, useEffect } from 'react';
import { sendMessage } from '../services/llmService';

const moodEmojis = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'excited', emoji: '😃', label: 'Excited' },
  { id: 'neutral', emoji: '😐', label: 'Neutral' },
  { id: 'worried', emoji: '😟', label: 'Worried' },
  { id: 'sad', emoji: '😢', label: 'Sad' }
];

const HomeScreen = ({ onNavigate, user }) => {
  const [currentMood, setCurrentMood] = useState(null);
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedMood = localStorage.getItem('currentMood');
    const savedCheckIn = localStorage.getItem('lastCheckIn');
    if (savedMood) {
      setCurrentMood(savedMood);
      updateRecommendations(savedMood);
    }
    if (savedCheckIn) {
      setLastCheckIn(new Date(savedCheckIn));
    }
  }, []);

  const updateRecommendations = async (mood) => {
    setIsLoading(true);
    try {
      const prompt = `Based on the user's current mood (${mood}), suggest 3 personalized activities that could help improve their mental well-being. Format the response as a JSON array with fields: id (string), icon (emoji), title (string), description (string), duration (string). Make the suggestions specific and actionable.`;
      
      const response = await sendMessage(prompt, mood);
      
      // Parse the response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const activities = JSON.parse(jsonMatch[0]);
        setRecommendations(activities);
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoodSelect = (moodId) => {
    setCurrentMood(moodId);
    localStorage.setItem('currentMood', moodId);
    localStorage.setItem('lastCheckIn', new Date().toISOString());
    setLastCheckIn(new Date());
    updateRecommendations(moodId);
  };

  const formatTimeAgo = (date) => {
    if (!date) return '';
    const minutes = Math.floor((new Date() - date) / 60000);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, 
          {user?.name || 'Guest'}!
        </h1>

        {/* Mood Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            How are you feeling today?
          </h2>
          <div className="flex justify-center space-x-8 mb-4">
            {moodEmojis.map(mood => (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                className={`flex flex-col items-center p-4 rounded-lg transition-all
                          ${currentMood === mood.id ? 'bg-blue-50 dark:bg-blue-900/20 scale-110' : 
                          'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                <span className="text-4xl mb-2">{mood.emoji}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{mood.label}</span>
              </button>
            ))}
          </div>
          {lastCheckIn && (
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Last check-in: {formatTimeAgo(lastCheckIn)}
            </p>
          )}
        </div>

        {/* Recommendations */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map(activity => (
                <div
                  key={activity.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl mb-4">{activity.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {activity.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Duration: {activity.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : currentMood && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No recommendations available. Please try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
