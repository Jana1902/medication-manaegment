import './style.css';

const Header = () => {
  const handleLogout = () => {
    window.location.href = '/login';
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
