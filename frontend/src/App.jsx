import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { OrigamiList } from "./components/Origami/OrigamiList";
import { ProtectedRoute } from "./components/Protected/ProtectedRoute";
import UserSessionProvider, { useUserSession } from "./hooks/useUserSession";
import { OrigamiDetails } from "./components/Origami/OrigamiDetails.jsx";
import { OrigamiForm } from "./components/Origami/OrigamiForm.jsx";
import { NavigationBar } from "./components/NavigationBar/NavigationBar.jsx";
import { Login } from "./components/Login/Login.jsx";
import { ArtistList } from "./components/Artist/ArtistList.jsx";
import { ArtistDetails } from "./components/Artist/ArtistDetails.jsx";
import { ArtistForm } from "./components/Artist/ArtistForm.jsx";
import { Register } from "./components/Register/Register.jsx";

function App() {
  const { userSession } = useUserSession();
  return (
    <>
      <div className="w-screen h-screen max-h-screen overflow-hidden flex flex-col bg-rose-200">
        <NavigationBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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
                {userSession?.role === "admin" && <OrigamiForm />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/origamis/:origamiId/update"
            element={
              <ProtectedRoute>
                {userSession?.role === "admin" && <OrigamiForm />}
              </ProtectedRoute>
            }
          />

          <Route
            path="/artists"
            element={
              <ProtectedRoute>
                <ArtistList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/artists/:artistId"
            element={
              <ProtectedRoute>
                <ArtistDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/artists/:artistId/update"
            element={
              <ProtectedRoute>
                {userSession?.role === "admin" && <ArtistForm />}
              </ProtectedRoute>
            }
          />

          <Route
            path="/artists/create"
            element={
              <ProtectedRoute>
                {userSession?.role === "admin" && <ArtistForm />}
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
