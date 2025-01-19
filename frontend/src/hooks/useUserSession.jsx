import { createContext, useContext, useState } from "react";

const userSessionContext = createContext(null);

export function useUserSession() {
  return useContext(userSessionContext);
}

export default function UserSessionProvider({ children }) {
  const setUserSession = (userSession) => {
    window.localStorage.setItem("token", userSession);
  };

  const getUserSession = () => {
    return window.localStorage.getItem("token");
  };

  return (
    <userSessionContext.Provider value={{ getUserSession, setUserSession }}>
      {children}
    </userSessionContext.Provider>
  );
}
