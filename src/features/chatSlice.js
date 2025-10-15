// src/features/chatSlice.js (Simplified Example)

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getChatbotResponse } from '../services/chatApi'; // Import the service

// 1. Create the async thunk for fetching the AI response
export const fetchBotResponse = createAsyncThunk(
  'chat/fetchBotResponse',
  async (userMessage, { rejectWithValue }) => {
    try {
      const botReply = await getChatbotResponse(userMessage);
      return { userMessage, botReply };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  messages: [
    { id: 1, text: "Hi! How can I help you?", sender: 'bot' }
  ],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Reducer for when the user sends a message (synchronous update)
    addUserMessage: (state, action) => {
      state.messages.push({
        id: Date.now(),
        text: action.payload,
        sender: 'user',
      });
    },
  },
  // 2. Handle the lifecycle of the async thunk
  extraReducers: (builder) => {
    builder
      // Case: API call is pending (loading state, add user message)
      .addCase(fetchBotResponse.pending, (state, action) => {
        state.status = 'loading';
        // Add a temporary 'bot' message to show the bot is thinking
        state.messages.push({ 
          id: Date.now() + 1, 
          text: '...', 
          sender: 'bot', 
          isThinking: true 
        });
      })
      // Case: API call succeeded (replace temp message with final response)
      .addCase(fetchBotResponse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the 'isThinking' message
        state.messages.pop(); 
        
        // Add the actual bot reply
        state.messages.push({
          id: Date.now() + 2,
          text: action.payload.botReply,
          sender: 'bot',
        });
      })
      // Case: API call failed (update state with error)
      .addCase(fetchBotResponse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        // Optional: Remove the 'isThinking' message and add an error message
        state.messages.pop(); 
        state.messages.push({
            id: Date.now() + 3,
            text: action.payload,
            sender: 'bot',
        });
      });
  },
});

export const { addUserMessage } = chatSlice.actions;
export default chatSlice.reducer;