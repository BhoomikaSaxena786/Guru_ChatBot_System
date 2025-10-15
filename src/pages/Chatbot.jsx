import { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  Sun, 
  Moon, 
  Link2, 
  Mic2, 
  CornerDownRight, 
  Trash2,  
  SquarePen, 
  Menu, 
  X,
  Check,
  User
} from 'lucide-react';
import { getChatbotResponse } from '../services/chatApi'; // ✅ Make sure path is correct

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [theme, setTheme] = useState("light");
  const [currentChatIndex, setCurrentChatIndex] = useState(-1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [botTyping, setBotTyping] = useState(false);

  const chatEndRef = useRef(null);
  const profileRef = useRef(null);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save history
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }, [history]);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const iconColor = theme === "dark" ? "text-white" : "text-gray-700";
  const primaryIconColor = "text-white";

  const handleToggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsgText = input.trim();
    const userMsg = { text: userMsgText, sender: "user" };

    // Display user message immediately
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setBotTyping(true); // Show typing indicator

    try {
      // Call the backend API
      const response = await getChatbotResponse(userMsgText);

      // ✅ Always extract plain text
      let botReply = "";
      if (typeof response === "string") {
        botReply = response;
      } else if (response?.parts) {
        if (Array.isArray(response.parts)) {
          botReply = response.parts.map(p => p.text || "").join(" ");
        } else {
          botReply = response.parts.text || JSON.stringify(response.parts);
        }
      } else if (response?.text) {
        botReply = response.text;
      } else {
        botReply = "Sorry, I encountered an error and cannot reply.";
      }

      const botMsg = { text: botReply, sender: "bot" };

      setMessages(prev => {
        const updated = [...prev, botMsg];

        // Update chat history
        setHistory(h => {
          if (currentChatIndex !== -1) {
            return h.map((chat, idx) =>
              idx === currentChatIndex ? updated : chat
            );
          } else if (updated.length > 2) {
            setCurrentChatIndex(h.length);
            return [...h, updated];
          }
          return h;
        });

        return updated;
      });
    } catch (error) {
      console.error("Failed to fetch AI response:", error);
      const errorMsg = { text: "Sorry, I can't connect to the AI right now.", sender: "bot" };
      setMessages(prev => [...prev, errorMsg]);
    }

    setBotTyping(false); // Hide typing indicator
  };

  const handleNewChat = () => {
    setMessages([{ text: "New chat started ", sender: "bot" }]);
    setInput("");
    setCurrentChatIndex(-1);
    setIsSidebarOpen(false);
    setShowClearConfirm(false);
  };

  const handleLoadChat = (chat, index) => {
    setMessages(chat);
    setCurrentChatIndex(index);
    setIsSidebarOpen(false);
    setShowClearConfirm(false);
  };

  const handleDeleteChat = (index) => (e) => {
    e.stopPropagation();
    setHistory(prev => {
      const newHistory = prev.filter((_, idx) => idx !== index);
      if (index === currentChatIndex) handleNewChat();
      else if (index < currentChatIndex) setCurrentChatIndex(currentChatIndex - 1);
      return newHistory;
    });
  };

  const handleClearHistory = () => {
    if (history.length > 0) setShowClearConfirm(true);
  };

  const handleConfirmClear = () => {
    setHistory([]);
    handleNewChat();
    setShowClearConfirm(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setMessages(prev => [...prev, { text: `📎 Uploaded: ${file.name}`, sender: "user" }]);
  };

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) return;
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event) => setInput(event.results[0][0].transcript);
    recognition.start();
  };

  const getChatTitle = (chat) => {
    const firstUserMsg = chat.find(msg => msg.sender === 'user');
    return firstUserMsg ? firstUserMsg.text : "New Conversation";
  };

  const sidebarBg = theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const chatHistoryItemBg = theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200";

  return (
    <div className={`flex h-screen w-full font-inter relative overflow-hidden ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 p-4 transition-transform duration-300 transform flex flex-col ${sidebarBg} md:relative md:translate-x-0 md:border-r md:shadow-none ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6">
          <button onClick={handleNewChat} className="flex items-center gap-2 p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition w-full" aria-label="Start new chat">
            <SquarePen size={20} className="text-purple-500" /> <span className="text-base font-medium">New chat</span>
          </button>
          <button onClick={handleToggleSidebar} className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition ml-2" aria-label="Close sidebar">
            <X size={20} className={iconColor} />
          </button>
        </div>

        <h2 className="text-sm font-semibold uppercase text-gray-500 mb-2 mt-4 px-3">Recent</h2>

        {showClearConfirm && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-sm text-red-800 dark:text-red-100">
            <p className="font-semibold mb-2">Are you sure?</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowClearConfirm(false)} className="p-1 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"><X size={20} /></button>
              <button onClick={handleConfirmClear} className="p-1 rounded-full text-green-700 dark:text-green-300 hover:bg-green-300 dark:hover:bg-green-700 transition"><Check size={20} /></button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto pr-1">
          {history.length === 0 && <p className="text-sm text-gray-500 italic px-3">Start a conversation to see history here.</p>}
          {history.map((chat, idx) => (
            <div key={idx} className={`mb-2 p-3 rounded-xl cursor-pointer transition-all duration-200 flex justify-between items-center group ${idx === currentChatIndex ? "bg-purple-500 text-white shadow-lg" : chatHistoryItemBg}`} onClick={() => handleLoadChat(chat, idx)}>
              <p className={`text-sm truncate pr-2 ${idx === currentChatIndex ? 'text-white font-medium' : 'text-current'}`} title={getChatTitle(chat)}>{getChatTitle(chat).substring(0,40)}</p>
              <button onClick={handleDeleteChat(idx)} className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${idx === currentChatIndex ? 'text-white hover:text-red-300' : 'text-gray-400 dark:text-gray-300 hover:text-red-500'}`} aria-label={`Delete chat ${idx + 1}`}><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </aside>

      {isSidebarOpen && <div onClick={handleToggleSidebar} className="fixed inset-0 bg-black/50 z-40 md:hidden"></div>}

      {/* Main Chat */}
      <div className="flex flex-col flex-1 max-w-4xl mx-auto w-full">
        <header className={`p-4 shadow-lg flex justify-between items-center z-10 transition-colors duration-300 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center gap-4">
            <button onClick={handleToggleSidebar} className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition" aria-label="Open sidebar">
              <Menu size={24} className={iconColor} />
            </button>
            <span className="text-xl font-bold flex items-center gap-2 text-purple-500"><Bot size={40} /> GURU Assistant</span>
          </div>

          <div className="flex gap-2 items-center" ref={profileRef}>
            {/* Profile dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="p-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition" 
                aria-label="User profile"
              >
                <User size={20} className={iconColor} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-1000 rounded-xl shadow-lg border dark:border-gray-700">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-purple-950">
                      My Profile
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-purple-950">
                      Settings
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-red-500">
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600" aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={20} className="text-yellow-700" /> : <Moon size={20} className="text-gray-600" />}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}>
              <div className={`p-4 rounded-3xl max-w-lg shadow-md break-words ${msg.sender === "bot" ? (theme === "dark" ? "bg-gray-700 text-white self-start" : "bg-white self-start text-gray-800 border border-gray-200") : "bg-purple-700 text-white self-end"}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {botTyping && (
            <div className="flex justify-start">
              <div className="p-4 rounded-3xl max-w-lg shadow-md break-words bg-white self-start text-gray-800 border border-gray-200 italic">
                Bot is typing...
              </div>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>

        <div className={`p-4 flex gap-3 items-center border-t transition-colors duration-300 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <input type="file" id="fileUpload" className="hidden" onChange={handleFileUpload} />
          <label htmlFor="fileUpload" className="p-2 w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600" ><Link2 size={20} className={iconColor} /></label>

          <button onClick={handleVoiceInput}   className="p-2 w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200  dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700
          " ><Mic2 size={20} className={iconColor} /></button>

          <input type="text" placeholder="Type your message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} className={`flex-1 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-700 transition-all duration-200 ${theme === "dark" ? "bg-gray-700 text-white placeholder-gray-400" : "bg-gray-10 text-black border border-gray-30"}`} />

          <button onClick={handleSend} disabled={!input.trim()} className={`p-2 w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 ${input.trim() ? "bg-purple-700 text-white hover:bg-purple-900" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}>
          <CornerDownRight size={20} className={primaryIconColor} />
          </button>
        </div>
      </div>
    </div>
  )
}

