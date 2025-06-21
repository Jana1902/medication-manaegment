import "./style.css";

const PatientDashboard = () => {
 const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h2>{getGreeting()}, User 👋</h2>
          <p className="subtext">Stay on track. Your health matters 💊</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card large">
            <h3>Streak 🔥</h3>
            <p><strong>5</strong> days</p>
          </div>
          <div className="stat-card large">
            <h3>Today’s Status ✅</h3>
            <p><strong>2</strong> meds left</p>
          </div>
          <div className="stat-card large">
            <h3>Next Dose ⏰</h3>
            <p>At <strong>8:00 PM</strong></p>
          </div>
          <div className="stat-card large">
            <h3>Refills Needed 🧾</h3>
            <p><strong>1</strong> due</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
