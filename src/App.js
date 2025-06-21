import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboardPage from "./pages/PatientDashboardPage"
import Caretaker from "./pages/Caretaker"
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/patient/:path" element={<PatientDashboardPage />} />
      <Route path="/caretaker/:path" element={<Caretaker />} />
    </Routes>
  );
};

export default App;
