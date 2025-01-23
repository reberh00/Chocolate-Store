import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { OrigamiList } from "./components/Origami/OrigamiList";
import { ProtectedRoute } from "./components/Protected/ProtectedRoute";
import UserSessionProvider from "./hooks/useUserSession";
import { OrigamiDetails } from "./components/Origami/OrigamiDetails.jsx";
import { OrigamiForm } from "./components/Origami/OrigamiForm.jsx";
import { NavigationBar } from "./components/NavigationBar/NavigationBar.jsx";

function App() {
  return (
    <Router>
      <UserSessionProvider>
        <div className="w-screen h-screen overflow-hidden flex flex-col">
          <NavigationBar />
          <Routes>
            <Route path="/origamis" element={<OrigamiList />} />
            <Route path="/origamis/:origamiId" element={<OrigamiDetails />} />

            <Route path="/origamis/create" element={<OrigamiForm />} />

            <Route
              path="/origamis/:origamiId/update"
              element={<OrigamiForm />}
            />
          </Routes>
        </div>
      </UserSessionProvider>
    </Router>
  );
}

export default App;
