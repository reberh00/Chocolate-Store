import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./input.css";
import App from "./App.jsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserSessionProvider from "./hooks/useUserSession.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <UserSessionProvider>
        <App />
      </UserSessionProvider>
    </Router>
  </StrictMode>,
);
