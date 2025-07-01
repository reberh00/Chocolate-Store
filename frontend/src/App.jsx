import { ChocolateDetails } from "./components/Chocolate/ChocolateDetails";
import { ManufacturerDetails } from "./components/Manufacturer/ManufacturerDetails";
import { ChocolateForm } from "./components/Chocolate/ChocolateForm";
import { ChocolateList } from "./components/Chocolate/ChocolateList";
import { Login } from "./components/Login/Login";
import { ManufacturerList } from "./components/Manufacturer/ManufacturerList";
import { ProtectedRoute } from "./components/Protected/ProtectedRoute";
import { SignUp } from "./components/SignUp/SignUp";
import UserSessionProvider from "./hooks/useUserSession";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ManufacturerForm } from "./components/Manufacturer/ManufacturerForm";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { UserList } from "./components/User/UserList";

function App() {
  return (
    <Router>
      <UserSessionProvider>
        <NavigationBar />
        <div>
          <Routes>
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
            <Route
              path="/manufacturers/:manufacturerId/"
              element={
                <ProtectedRoute>
                  <ManufacturerDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/manufacturers/create"
              element={
                <ProtectedRoute>
                  <ManufacturerForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manufacturers/:manufacturerId/update"
              element={
                <ProtectedRoute>
                  <ManufacturerForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <UserList />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </UserSessionProvider>
    </Router>
  );
}

export default App;
