import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, LogIn, AlertTriangle } from "lucide-react";

export default function SignIn({ onSignIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (username.trim() === "admin" && password === "1234") {
      onSignIn();
      navigate("/chatbot");
    } else {
      setError("Invalid username or password. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500">
      
      {/* Animated Background Gradient */}
      <motion.div
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 opacity-60"
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Floating Orbs */}
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-20 left-10"
      />
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute w-96 h-96 bg-pink-400/20 rounded-full blur-3xl bottom-16 right-10"
      />

      {/* Glass Card */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70, damping: 12 }}
        className="relative w-full max-w-md bg-white/20 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/30"
      >
        {/* Header */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 90 }}
          className="flex flex-col items-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
          >
            <Bot className="h-14 w-14 text-indigo-700 drop-shadow-lg mb-3" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
            Welcome Back
          </h1>
          <p className="text-md text-indigo-100 mt-1">
            Sign in to access your AI Assistant
          </p>
          <p className="mt-2 text-xs text-indigo-200">
            (Dev Test: <b>admin</b> / <b>1234</b>)
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="e.g., admin or your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-200 focus:outline-none 
                         focus:ring-2 focus:ring-indigo-400 transition-all shadow-sm placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </motion.div>

          {/* Password */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-200 focus:outline-none 
                         focus:ring-2 focus:ring-indigo-400 transition-all shadow-sm placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </motion.div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center bg-red-100/90 p-3 rounded-lg border border-red-300"
              role="alert"
            >
              <AlertTriangle className="h-4 w-4 text-red-700 mr-2 flex-shrink-0" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {/* Button */}
          <motion.button
            whileHover={{ scale: !isLoading ? 1.05 : 1 }}
            whileTap={{ scale: !isLoading ? 0.95 : 1 }}
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-3 font-semibold rounded-xl shadow-lg 
                        transition duration-150 ease-in-out ${
                          isLoading
                            ? "bg-indigo-400 cursor-not-allowed text-white"
                            : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50"
                        }`}
          >
            {isLoading ? (
              <>
                <motion.svg
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 
                      5.373 0 12h4zm2 5.291A7.962 7.962 
                      0 014 12H0c0 3.042 1.135 5.824 
                      3 7.938l3-2.647z"
                  ></path>
                </motion.svg>
                Signing In...
              </>
            ) : (
              <>
                <LogIn className="h-5 w-5 mr-2" />
                Sign In
              </>
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-xs text-white/80"
        >
          <span className="text-white/90">By signing in, you agree to our</span>{" "}
          <a
            href="/terms"
            className="text-indigo-200 hover:text-white font-medium hover:underline"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-indigo-200 hover:text-white font-medium hover:underline"
          >
            Privacy Policy
          </a>
          .
        </motion.p>
      </motion.div>
    </div>
  );
}
