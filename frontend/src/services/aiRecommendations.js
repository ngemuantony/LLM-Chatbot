// AI-driven recommendations based on user's mood
import { sendMessage } from './llmService';

const generatePromptForMood = (mood) => {
  const prompts = {
    happy: "Generate 3 activities that would complement and maintain a happy mood. Include meditation, journaling, or community connection options. Format as JSON with fields: id, title, description, icon, duration.",
    excited: "Generate 3 activities to channel excitement positively. Include meditation, journaling, or community connection options. Format as JSON with fields: id, title, description, icon, duration.",
    neutral: "Generate 3 balanced activities for emotional well-being. Include meditation, journaling, or community connection options. Format as JSON with fields: id, title, description, icon, duration.",
    worried: "Generate 3 calming activities to help manage worry. Include meditation, journaling, or community connection options. Format as JSON with fields: id, title, description, icon, duration.",
    sad: "Generate 3 uplifting activities to help improve mood. Include meditation, journaling, or community connection options. Format as JSON with fields: id, title, description, icon, duration."
  };

  return prompts[mood] || prompts.neutral;
};

const parseActivities = (response) => {
  try {
    // Extract JSON from the response (it might be wrapped in text)
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return [];
    
    const data = JSON.parse(jsonMatch[0]);
    return Array.isArray(data) ? data : data.activities || [];
  } catch (error) {
    console.error('Error parsing activities:', error);
    return [];
  }
};

export const getRecommendations = async (mood) => {
  try {
    const prompt = generatePromptForMood(mood);
    const response = await sendMessage(prompt, mood);
    const activities = parseActivities(response);
    
    return {
      activities: activities.map(activity => ({
        ...activity,
        id: activity.id || Math.random().toString(36).substr(2, 9)
      }))
    };
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return { activities: [] };
  }
};

export const getChatPrompt = async (mood) => {
  const prompt = `Generate a warm, empathetic greeting for a user who is feeling ${mood}. Keep it concise and supportive.`;
  try {
    return await sendMessage(prompt, mood);
  } catch (error) {
    console.error('Error getting chat prompt:', error);
    return `Hi! I'm here to listen and support you. How can I help?`;
  }
};
