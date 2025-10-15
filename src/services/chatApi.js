import axios from 'axios';

const BACKEND_ENDPOINT = 'http://localhost:3001/api/chat';

export const getChatbotResponse = async (userMessage) => {
  try {
    const response = await axios.post(BACKEND_ENDPOINT, {
      userMessage: userMessage,
    });
    return response.data.reply;
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    return "Sorry, I lost connection to my server. Please check the console.";
  }
};
