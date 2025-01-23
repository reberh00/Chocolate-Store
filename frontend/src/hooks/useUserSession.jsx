import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const userSessionContext = createContext(null);

export function useUserSession() {
  return useContext(userSessionContext);
}

export default function UserSessionProvider({ children }) {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState(
    JSON.parse(window.localStorage.getItem("userSession")),
  );

  function login(newUserSession) {
    window.localStorage.setItem("userSession", JSON.stringify(newUserSession));
    setUserSession(newUserSession);
    navigate("/origamis");
  }

  function logout() {
    window.localStorage.removeItem("userSession");
    setUserSession(null);
    navigate("/login");
  }

  return (
    <userSessionContext.Provider value={{ userSession, login, logout }}>
      {children}
    </userSessionContext.Provider>
  );
}
