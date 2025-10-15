import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import chatReducer from "../features/chatSlice.js";
import themeReducer from "../features/themeSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    theme: themeReducer,
  },
});
