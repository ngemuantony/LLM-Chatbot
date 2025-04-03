import React, { useState, useEffect } from 'react';
import { sendMessage } from '../services/llmService';

const MusicMeditation = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Content', icon: '🌟' },
    { id: 'meditation', name: 'Meditation', icon: '🧘' },
    { id: 'relaxation', name: 'Relaxation Music', icon: '🎵' },
    { id: 'nature', name: 'Nature Sounds', icon: '🌿' },
    { id: 'guided', name: 'Guided Sessions', icon: '🎯' }
  ];

  const getPersonalizedContent = async () => {
    setLoading(true);
    try {
      const currentMood = localStorage.getItem('currentMood') || 'neutral';
      const prompt = `Based on the user's current mood (${currentMood}) and selected category (${selectedCategory}), 
                     suggest 6 personalized meditation or music sessions. Format as JSON array with fields: 
                     id (string), title (string), description (string), duration (string), category (string), 
                     thumbnail (string), benefits (string). Make suggestions specific and relevant to improving mental well-being.`;
      
      const response = await sendMessage(prompt);
      
      // Parse the response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const suggestions = JSON.parse(jsonMatch[0]);
        setContent(suggestions);
      }
    } catch (error) {
      console.error('Error getting personalized content:', error);
      setContent([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPersonalizedContent();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          Music & Meditation
        </h1>
        
        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md 
                       hover:shadow-lg transition-all ${
                         selectedCategory === category.id 
                         ? 'ring-2 ring-blue-500 transform scale-105' 
                         : ''
                       }`}
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <div className="text-gray-800 dark:text-white font-medium">
                {category.name}
              </div>
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : content.length > 0 ? (
            content.map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
                         hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">
                    {item.category === 'meditation' ? '🧘' :
                     item.category === 'relaxation' ? '🎵' :
                     item.category === 'nature' ? '🌿' : '🎯'}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Duration: {item.duration}
                    </span>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                                   hover:bg-blue-700 transition-colors text-sm">
                      Start Session
                    </button>
                  </div>
                </div>
                <div className="px-6 pb-4">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium">Benefits:</span> {item.benefits}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-12">
              No content available for the selected category. Please try another category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicMeditation;
