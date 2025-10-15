
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Introduction from "./pages/IntroductionPage";
import SignIn from "./pages/SignIn";
import Chatbot from "./pages/Chatbot";
import MyProfile from "./components/MyProfile";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component

export default function App() {
  const [dark, setDark] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  // Apply/remove dark mode class on <html>
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Introduction />} />
        <Route path="/signin" element={<SignIn onSignIn={() => setSignedIn(true)} />} />

        {/* Protected routes wrapped in the ProtectedRoute component */}
        <Route element={<ProtectedRoute signedIn={signedIn} />}>
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Route>
      </Routes>
   
  );
}


