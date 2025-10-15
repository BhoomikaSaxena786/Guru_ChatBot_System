import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Introduction() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-sky-500 via-purple-800 to-indigo-700 
      text-white px-6 text-center">
      
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold drop-shadow-lg"
      >
        Welcome to GURU ASSISTANT
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-6 text-lg md:text-xl max-w-xl text-blue-100"
      >
        Your AI-powered assistant for smarter conversations. 
        Sign in to start chatting!
      </motion.p>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/signin")}
        className="mt-10 bg-white text-purple-700 font-semibold px-8 py-4 rounded-full shadow-lg 
        hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-300 transition w-56"
      >
        Get Started
      </motion.button>
    </div>
  );
}
