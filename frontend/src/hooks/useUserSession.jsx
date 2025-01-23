import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const userSessionContext = createContext(null);

export function useUserSession() {
  return useContext(userSessionContext);
}

export default function UserSessionProvider({ children }) {
  const navigate = useNavigate();
  const setUserSession = (userSession) => {
    window.localStorage.setItem("token", userSession);
    navigate("/chocolates");
  };

  const logOut = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  const getUserSession = () => {
    return window.localStorage.getItem("token");
  };

  return (
    <userSessionContext.Provider
      value={{ getUserSession, setUserSession, logOut }}
    >
      {children}
    </userSessionContext.Provider>
  );
}
