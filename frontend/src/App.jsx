import { ChocolateDetails } from "./components/Chocolate/ChocolateDetails";
import { ChocolateForm } from "./components/Chocolate/ChocolateForm";
import { ChocolateList } from "./components/Chocolate/ChocolateList";
import { Login } from "./components/Login/Login";
import { ManufacturerList } from "./components/Manufacturer/ManufacturerList";
import { ProtectedRoute } from "./components/Protected/ProtectedRoute";
import { SignUp } from "./components/SignUp/SignUp";
import UserSessionProvider from "./hooks/useUserSession";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <UserSessionProvider>
      <Router>
        <div>
          <Routes>
            <Route
              path="/chocolates/:chocolateId"
              element={<ChocolateDetails />}
            />
            <Route
              path="/chocolates"
              element={
                <ProtectedRoute>
                  <ChocolateList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manufacturers"
              element={
                <ProtectedRoute>
                  <ManufacturerList />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/chocolates/create"
              element={
                <ProtectedRoute>
                  <ChocolateForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chocolates/:chocolateId/update"
              element={
                <ProtectedRoute>
                  <ChocolateForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chocolates/:chocolateId/"
              element={
                <ProtectedRoute>
                  <ChocolateDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </UserSessionProvider>
  );
}

export default App;
