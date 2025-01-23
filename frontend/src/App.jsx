import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { OrigamiList } from "./components/Origami/OrigamiList";
import { ProtectedRoute } from "./components/Protected/ProtectedRoute";
import UserSessionProvider from "./hooks/useUserSession";
import { OrigamiDetails } from "./components/Origami/OrigamiDetails.jsx";
import { OrigamiForm } from "./components/Origami/OrigamiForm.jsx";
import { NavigationBar } from "./components/NavigationBar/NavigationBar.jsx";
import { Login } from "./components/Login/Login.jsx";

function App() {
  return (
    <Router>
      <UserSessionProvider>
        <div className="w-screen h-screen max-h-screen overflow-hidden flex flex-col bg-rose-200">
          <NavigationBar />
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/origamis"
              element={
                <ProtectedRoute>
                  <OrigamiList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/origamis/:origamiId"
              element={
                <ProtectedRoute>
                  <OrigamiDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/origamis/create"
              element={
                <ProtectedRoute>
                  <OrigamiForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/origamis/:origamiId/update"
              element={
                <ProtectedRoute>
                  <OrigamiForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </UserSessionProvider>
    </Router>
  );
}

export default App;
