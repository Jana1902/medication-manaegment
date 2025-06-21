import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./style.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    localStorage.removeItem("type");
    Cookies.remove("jwtToken");

    navigate("/login", { replace: true });
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-title">
          <div className="logo">
            <span className="logo-text">M</span>
          </div>
          <h4 className="app-title">Medication Manager</h4>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
