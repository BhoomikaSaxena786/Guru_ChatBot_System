// import { useState } from "react";

// export default function ChatInput({ onSend }) {
//   const [input, setInput] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSend(input);
//     setInput("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex gap-2">
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Type a message..."
//         className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />
//       <button
//         type="submit"
//         className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
//       >
//         Send
//       </button>
//     </form>
//   );
// }




// src/components/ChatInput.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserMessage, fetchBotResponse } from '../features/chatSlice';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = input.trim();
    
    // 1. Dispatch the user's message to immediately update the UI
    dispatch(addUserMessage(userMessage));
    
    // 2. Dispatch the async thunk to fetch the bot's response
    dispatch(fetchBotResponse(userMessage));
    
    // 3. Clear the input field
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="hidden">Send</button>
    </form>
  );
};

export default ChatInput;
