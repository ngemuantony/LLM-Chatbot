import React, { useState } from 'react';
import { sendMessage } from '../services/llmService';

const Recommendations = () => {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('all');
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: 'all', name: 'All Services', icon: '🏥' },
    { id: 'therapists', name: 'Therapists', icon: '👨‍⚕️' },
    { id: 'centers', name: 'Rehabilitation Centers', icon: '🏢' },
    { id: 'hotlines', name: 'Crisis Hotlines', icon: '📞' }
  ];

  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      const currentMood = localStorage.getItem('currentMood') || 'neutral';
      const prompt = `Based on the user's current mood (${currentMood}) and their location (${location || 'any'}), 
                     generate mental health service recommendations for category: ${category}. 
                     Format as JSON array with fields: id, name, category, contact, description, rating, reviews.
                     Include realistic contact information and ratings.`;
      
      const response = await sendMessage(prompt);
      
      // Parse the response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const recommendations = JSON.parse(jsonMatch[0]);
        setServices(recommendations);
      }
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Mental Health Services
      </h1>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location..."
            className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg
                     border border-gray-200 dark:border-gray-600
                     text-gray-800 dark:text-white focus:ring-2
                     focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg
                     border border-gray-200 dark:border-gray-600
                     text-gray-800 dark:text-white focus:ring-2
                     focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Generate Recommendations Button */}
        <button
          onClick={generateRecommendations}
          disabled={isLoading}
          className="w-full p-3 bg-blue-600 text-white rounded-lg
                   hover:bg-blue-700 transition-colors disabled:opacity-50
                   flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating...
            </>
          ) : (
            'Get Recommendations'
          )}
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div
            key={service.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden
                     hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {service.description}
              </p>
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 mr-2">⭐</div>
                <div className="text-gray-600 dark:text-gray-300">
                  {service.rating} ({service.reviews} reviews)
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg
                           hover:bg-blue-700 transition-colors"
                >
                  Contact
                </button>
                <div className="text-gray-600 dark:text-gray-300">
                  {service.contact}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Section */}
      <div className="mt-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-4">
          🚨 Emergency Services
        </h2>
        <p className="text-red-700 dark:text-red-300 mb-4">
          If you're experiencing a mental health emergency or crisis:
        </p>
        <ul className="list-disc list-inside text-red-700 dark:text-red-300 space-y-2">
          <li>Call 911 immediately</li>
          <li>National Suicide Prevention Lifeline: 1-800-273-8255</li>
          <li>Crisis Text Line: Text HOME to 741741</li>
        </ul>
      </div>
    </div>
  );
};

export default Recommendations;
