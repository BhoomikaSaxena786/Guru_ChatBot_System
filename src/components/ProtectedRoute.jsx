// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ signedIn }) {
  // If user is not signed in, redirect to SignIn page
  if (!signedIn) {
    return <Navigate to="/signin" replace />;
  }

  // Otherwise, render the child routes (Chatbot, MyProfile, etc.)
  return <Outlet />;
}
