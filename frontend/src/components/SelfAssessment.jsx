import React, { useState } from 'react';
import { sendMessage } from '../services/llmService';

const SelfAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // PHQ-9 Depression Screening Questions
  const questions = [
    {
      id: 1,
      text: "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
      options: [
        { value: 0, text: "Not at all" },
        { value: 1, text: "Several days" },
        { value: 2, text: "More than half the days" },
        { value: 3, text: "Nearly every day" }
      ]
    },
    {
      id: 2,
      text: "Over the last 2 weeks, how often have you had little interest or pleasure in doing things?",
      options: [
        { value: 0, text: "Not at all" },
        { value: 1, text: "Several days" },
        { value: 2, text: "More than half the days" },
        { value: 3, text: "Nearly every day" }
      ]
    },
    {
      id: 3,
      text: "Over the last 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
      options: [
        { value: 0, text: "Not at all" },
        { value: 1, text: "Several days" },
        { value: 2, text: "More than half the days" },
        { value: 3, text: "Nearly every day" }
      ]
    },
    {
      id: 4,
      text: "Over the last 2 weeks, how often have you felt tired or had little energy?",
      options: [
        { value: 0, text: "Not at all" },
        { value: 1, text: "Several days" },
        { value: 2, text: "More than half the days" },
        { value: 3, text: "Nearly every day" }
      ]
    },
    {
      id: 5,
      text: "Over the last 2 weeks, how often have you had poor appetite or been overeating?",
      options: [
        { value: 0, text: "Not at all" },
        { value: 1, text: "Several days" },
        { value: 2, text: "More than half the days" },
        { value: 3, text: "Nearly every day" }
      ]
    }
  ];

  const handleAnswer = async (value) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // If this is the last question, calculate results and get recommendations
      await getRecommendations(newAnswers);
    }
  };

  const calculateResults = (answers) => {
    const score = Object.values(answers).reduce((a, b) => a + b, 0);
    const maxScore = questions.length * 3;
    
    let severity = "minimal";
    if (score >= 15) severity = "severe";
    else if (score >= 10) severity = "moderate";
    else if (score >= 5) severity = "mild";
    
    return {
      score,
      maxScore,
      severity
    };
  };

  const getRecommendations = async (answers) => {
    setIsLoading(true);
    try {
      const results = calculateResults(answers);
      
      const prompt = `Based on a mental health self-assessment with a score of ${results.score}/${results.maxScore} 
                     (${results.severity} severity), provide 3-4 specific recommendations for improving mental well-being. 
                     Format the response as a JSON array with fields: id (string), category (string), 
                     recommendation (string), reasoning (string). Categories should be one of: 
                     'Immediate Actions', 'Lifestyle Changes', 'Professional Help', or 'Self-Care'.`;
      
      const response = await sendMessage(prompt);
      
      // Parse the response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsedRecommendations = JSON.parse(jsonMatch[0]);
        setRecommendations(parsedRecommendations);
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          Mental Health Self-Assessment
        </h1>

        {currentQuestion < questions.length ? (
          <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`
                  }}
                />
              </div>
              <div className="text-right text-sm text-gray-600 dark:text-gray-400 mt-2">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                {questions[currentQuestion].text}
              </h2>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full p-4 text-left bg-gray-50 dark:bg-gray-700 
                             rounded-lg border border-gray-200 dark:border-gray-600
                             hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors
                             text-gray-800 dark:text-white"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            {/* Results Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Assessment Results
              </h2>
              <div className="mb-6">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {calculateResults(answers).score} / {calculateResults(answers).maxScore}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Based on your responses, here are some personalized recommendations:
                </p>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {recommendations.map((rec) => (
                      <div 
                        key={rec.id}
                        className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                      >
                        <div className="flex items-center mb-2">
                          <span className="px-3 py-1 text-sm font-medium bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full">
                            {rec.category}
                          </span>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 font-medium mb-2">
                          {rec.recommendation}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {rec.reasoning}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setRecommendations([]);
                }}
                className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                         transition-colors mt-4"
              >
                Take Assessment Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfAssessment;
