import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./notes/Login.jsx";
import Dashboard from "./notes/Dashboard.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import { AuthProvider } from "./context/AuthContext";
import Register from "./notes/Register"; 

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
