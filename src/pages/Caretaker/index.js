import Header from "../../components/Header";
import "./style.css";

const Caretaker = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const Dashboard = () => {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card">
          <div className="dashboard-header">
            <h2>{getGreeting()}, Caretaker 👋</h2>
            <p className="subtext">You're making a difference every day 💙</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card large">
              <h3>Assigned Patients 🧑‍⚕️</h3>
              <p>
                <strong>3</strong> active
              </p>
            </div>
            <div className="stat-card large">
              <h3>Tasks Completed ✅</h3>
              <p>
                <strong>5</strong> today
              </p>
            </div>
            <div className="stat-card large">
              <h3>Upcoming Doses ⏰</h3>
              <p>
                <strong>2</strong> at 8:00 PM
              </p>
            </div>
            <div className="stat-card large">
              <h3>Reports Pending 📋</h3>
              <p>
                <strong>1</strong> remaining
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <Dashboard />
    </>
  );
};

export default Caretaker;
