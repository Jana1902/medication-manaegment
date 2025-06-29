import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboardPage from "./pages/PatientDashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Caretaker from "./pages/Caretaker";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/patient/:id"
        element={
          <ProtectedRoute>
            <PatientDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/caretaker/:id"
        element={
          <ProtectedRoute>
            <Caretaker />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
