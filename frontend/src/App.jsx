import { ChocolateDetails } from "./components/Chocolate/ChocolateDetails";
import { ChocolateList } from "./components/Chocolate/ChocolateList";
import { Login } from "./components/Login/Login";
import { ManufacturerList } from "./components/Manufacturer/ManufacturerList";
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
            <Route path="/chocolates" element={<ChocolateList />} />
            <Route path="/manufacturers" element={<ManufacturerList />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </UserSessionProvider>
  );
}

export default App;
