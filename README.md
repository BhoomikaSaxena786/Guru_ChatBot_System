**💬 Gemini Chatbot System**


A full-stack, responsive chat application powered by the Gemini API for intelligent conversational responses.

This system is divided into two parts: a React frontend for the user interface and a Node.js/Express backend to securely manage the API interaction and secrets.
<img width="1920" height="1080" alt="Screenshot (203)" src="https://github.com/user-attachments/assets/588a86f7-6b25-4a36-adc3-fd9ec5e7cac2" />
<img width="1920" height="1080" alt="Screenshot (204)" src="https://github.com/user-attachments/assets/a1d05871-68cd-4797-886a-1261a2bdd29e" />
**✨ Features**

Gemini Powered Responses: Utilizes the @google/genai SDK and the gemini-2.5-flash model for fast, relevant, and engaging chat.

Full-Stack Architecture: Separate client and server directories for clean organization.

Secure API Handling: Uses environment variables (.env) on the server to prevent API key exposure.

User Authentication Flow: Includes conceptual routes for SignIn, Chatbot, and a protected MyProfile component using React Router.
<img width="1920" height="1080" alt="Screenshot (202)" src="https://github.com/user-attachments/assets/3eb1ca61-4372-4467-8113-24304eb2dca4" />
<img width="1920" height="1080" alt="Screenshot (200)" src="https://github.com/user-attachments/assets/62917bbd-a4af-4133-aaea-a948034c0fa1" />
<img width="1920" height="1080" alt="Screenshot (201)" src="https://github.com/user-attachments/assets/29e199ba-1ba0-48ff-bd68-c8f086fa2d12" />


**🛠️ Technology Stack**
Area

Technology

Purpose

Frontend

React, Tailwind CSS

UI components and styling (responsive design).

Backend

Node.js, Express, CORS

Server-side routing, API key management, and proxy.

AI/LLM

Google Gen AI SDK (@google/genai)

Connecting to the Gemini API.

<img width="1920" height="1080" alt="Screenshot (207)" src="https://github.com/user-attachments/assets/60ba6f18-0a30-4ca9-9be4-eee0f0b8231d" />

<img width="1920" height="1080" alt="Screenshot (205)" src="https://github.com/user-attachments/assets/97356351-18d2-47d5-ba4e-7ea9e4bc684a" />

**🚀 Getting Started**
Follow these steps to get your chatbot system running locally.

Prerequisites
Node.js: Ensure you have Node.js (v18 or higher) installed.

API Key: Obtain a Gemini API Key from Google AI Studio.

1. Backend Setup (CHAT_BOT_SERVER)
Navigate to the backend directory and set up the server.

# Go into the server directory
cd CHAT_BOT_SERVER

# Install server dependencies (express, cors, dotenv, @google/genai)
npm install

1.1. Environment Configuration
Create a file named .env in the root of the CHAT_BOT_SERVER directory and add your API key:

# CHAT_BOT_SERVER/.env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"

⚠️ Security Note: Never commit your .env file to GitHub. It should be listed in your .gitignore.

1.2. Run the Backend
Start the server, which will run on http://localhost:3001:

node server.js

<img width="1920" height="1080" alt="Screenshot (208)" src="https://github.com/user-attachments/assets/4e6e91dd-e657-46f4-a173-5a4d45fcd7ca" />


# Server running securely on http://localhost:3001

2. Frontend Setup (CHAT_BOT_CLIENT)
Open a second terminal window (do not stop the backend server) and navigate to the frontend directory.

# Go into the client directory
cd CHAT_BOT_CLIENT

# Install client dependencies (react, react-router-dom, etc.)
npm install

# Start the React development server
npm start

The frontend application should open automatically in your browser at http://localhost:3000 and will proxy chat requests to the backend at http://localhost:3001/api/chat.

🧩 Project Structure
The project is organized into two main directories:

├── CHAT_BOT_CLIENT/            # React Frontend Application
│   ├── src/
|   |   |___app/
|   |   |___features/
│   │   ├── components/         # Reusable UI components (e.g., MyProfile.jsx)
│   │   ├── pages/              # Main application pages (e.g., Chatbot.jsx, SignIn.jsx)
|   |   |___services/
│   │   └── App.jsx             # Main router and app shell
│   └── package.json
│
└── CHAT_BOT_SERVER/            # Node.js/Express Backend
    ├── server.js               # Main server logic and Gemini API route handler
    ├── .env                    # **Private API Key Storage**
    └── package.json

**📝 Usage**
Navigate to the sign-in page (/signin).

Use the "Simulate Sign In" button to set the signedIn state to true.

Navigate to the Chatbot page (/chatbot) to begin chatting with the Gemini model.

Navigate to the Profile page (/profile) to view the protected user profile component.
