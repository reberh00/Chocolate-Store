import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { OrigamiList } from "./components/Origami/OrigamiList";
import { ProtectedRoute } from "./components/Protected/ProtectedRoute";
import UserSessionProvider from "./hooks/useUserSession";

function App() {
  return (
    <Router>
      <UserSessionProvider>
        <div>
          <Routes>
            <Route
              path="/origamis"
              element={
                <OrigamiList />
              }
            />
          </Routes>
        </div>
      </UserSessionProvider>
    </Router>
  );
}

export default App;
