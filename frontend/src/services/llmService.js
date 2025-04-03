import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../src/declarations/backend/backend.did.js';

let backendCanister = null;

const initializeActor = async () => {
  if (backendCanister) return backendCanister;

  const agent = new HttpAgent({
    host: process.env.DFX_NETWORK === 'ic' 
      ? 'https://ic0.app' 
      : 'http://127.0.0.1:4943'
  });

  // Only fetch root key in development
  if (process.env.NODE_ENV !== 'production') {
    try {
      await agent.fetchRootKey();
    } catch (err) {
      console.warn('Unable to fetch root key. Check if your local replica is running');
      console.error(err);
    }
  }

  backendCanister = await Actor.createActor(idlFactory, {
    agent,
    canisterId: process.env.BACKEND_CANISTER_ID || process.env.CANISTER_ID_BACKEND
  });

  return backendCanister;
};

const getMoodBasedPrompt = (mood, message) => {
  const moodPrompts = {
    happy: `User is feeling happy. Their message: "${message}". Respond in an upbeat and encouraging way while maintaining professionalism.`,
    excited: `User is feeling excited. Their message: "${message}". Match their enthusiasm while providing constructive guidance.`,
    neutral: `User is feeling neutral. Their message: "${message}". Provide balanced and supportive responses.`,
    worried: `User is feeling worried. Their message: "${message}". Offer calm, reassuring support and practical coping strategies.`,
    sad: `User is feeling sad. Their message: "${message}". Show empathy and provide gentle encouragement and support.`
  };

  return moodPrompts[mood] || moodPrompts.neutral;
};

export const sendMessage = async (message, mood = 'neutral') => {
  try {
    const canister = await initializeActor();
    const prompt = getMoodBasedPrompt(mood, message);
    const response = await canister.prompt(prompt);
    return response;
  } catch (error) {
    console.error('Error sending message to LLM:', error);
    throw error;
  }
};

export const sendChatMessages = async (messages, currentMood = 'neutral') => {
  try {
    const canister = await initializeActor();
    
    // Format messages for the LLM
    const formattedMessages = messages.map(msg => ({
      role: msg.type === 'user' ? { user: null } : { system: null },
      content: msg.content
    }));

    // Add mood context to the conversation
    formattedMessages.unshift({
      role: { system: null },
      content: `The user is currently feeling ${currentMood}. Adjust your responses accordingly to provide appropriate emotional support.`
    });

    const response = await canister.chat(formattedMessages);
    return response;
  } catch (error) {
    console.error('Error sending chat messages to LLM:', error);
    throw error;
  }
};
