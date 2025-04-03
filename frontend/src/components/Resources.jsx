import React from 'react';

const therapeuticExercises = [
  {
    title: 'Journaling',
    description: 'Express your thoughts and feelings through guided writing exercises',
    icon: '📝',
    duration: '15-30 min',
    difficulty: 'Easy'
  },
  {
    title: 'Meditation',
    description: 'Practice mindfulness and meditation techniques',
    icon: '🧘‍♂️',
    duration: '10-20 min',
    difficulty: 'Medium'
  },
  {
    title: 'CBT Exercise',
    description: 'Learn cognitive behavioral therapy techniques',
    icon: '🧠',
    duration: '20-30 min',
    difficulty: 'Medium'
  },
  {
    title: 'Breathing Exercise',
    description: 'Practice deep breathing techniques for relaxation',
    icon: '🫁',
    duration: '5-10 min',
    difficulty: 'Easy'
  }
];

const professionalHelp = [
  {
    title: 'Crisis Helpline',
    description: '24/7 Support Available',
    contact: '1-800-273-8255',
    icon: '🆘',
    urgent: true
  },
  {
    title: 'Find a Therapist',
    description: 'Connect with licensed mental health professionals',
    icon: '👨‍⚕️',
    link: '#find-therapist'
  },
  {
    title: 'Support Groups',
    description: 'Join online or local support communities',
    icon: '👥',
    link: '#support-groups'
  },
  {
    title: 'Mental Health Resources',
    description: 'Access educational materials and guides',
    icon: '📚',
    link: '#resources'
  }
];

const Resources = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          Self-Help & Resources
        </h2>
        
        <div className="space-y-8">
          {/* Therapeutic Exercises Section */}
          <section>
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Therapeutic Exercises
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {therapeuticExercises.map((exercise, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg 
                           transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{exercise.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                        {exercise.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        {exercise.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          ⏱ {exercise.duration}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          📊 {exercise.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Professional Assistance Section */}
          <section>
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Professional Assistance
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {professionalHelp.map((help, index) => (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md 
                            ${help.urgent ? 'border-2 border-red-500 dark:border-red-600' : 
                                          'border border-gray-100 dark:border-gray-700'}
                            hover:shadow-lg transition-shadow duration-300`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{help.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                        {help.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        {help.description}
                      </p>
                      {help.contact && (
                        <a
                          href={`tel:${help.contact.replace(/-/g, '')}`}
                          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 
                                   text-white rounded-md transition-colors"
                        >
                          <span className="mr-2">📞</span>
                          {help.contact}
                        </a>
                      )}
                      {help.link && (
                        <a
                          href={help.link}
                          className="inline-flex items-center text-blue-600 dark:text-blue-400 
                                   hover:underline"
                        >
                          Learn More →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Resources */}
          <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Additional Resources
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300">
                Remember that seeking help is a sign of strength, not weakness. 
                If you're experiencing a mental health emergency, please contact emergency 
                services immediately or reach out to our crisis helpline.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Download our mental health guide</li>
                <li>• Subscribe to our weekly wellness newsletter</li>
                <li>• Join our supportive online community</li>
                <li>• Access free educational webinars</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resources;
