import { useEffect, useState } from "react";
import "./style.css";

const PatientDashboard = () => {
  const [streak, setStreak] = useState(0);
  const [todayStatus, setTodayStatus] = useState("Not done");
  const [nextDose, setNextDose] = useState("--:--");
  const [refills, setRefills] = useState(0);
  const [username, setUsername] = useState("");
  const [medicationForm, setMedicationForm] = useState({
    id: "",
    status: "taken",
    notes: "",
  });
  const [medications, setMedications] = useState([]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("jwtToken");
      const username = localStorage.getItem("username");
      setUsername(username);
      try {
        const res = await fetch(
          `https://medication-api-b2jz.onrender.com/patient-dashboard?username=${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setStreak(data.streak || 0);
        setTodayStatus(data.todayStatus || "No data");
        setNextDose(data.nextDose || "--:--");
        setRefills(data.refills || 0);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };

    const fetchMedications = async () => {
      const token = localStorage.getItem("jwtToken");
      const username = localStorage.getItem("username");
      try {
        const res = await fetch(
          `https://medication-api-b2jz.onrender.com/medications?caretaker=${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setMedications(data);
      } catch (err) {
        console.error("Failed to fetch medications", err);
      }
    };

    fetchDashboardData();
    fetchMedications();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setMedicationForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMedicationSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    const payload = {
      username,
      medication_id: medicationForm.id,
      status: medicationForm.status,
      notes: medicationForm.notes,
    };

    try {
      const res = await fetch(
        "https://medication-api-b2jz.onrender.com/patient/update-medication-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        alert("Medication updated successfully");
        setMedicationForm({ id: "", status: "taken", notes: "" });
      } else {
        console.error("Failed to update medication");
      }
    } catch (err) {
      console.error("Server error", err);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h2>
            {getGreeting()}, {username} 👋
          </h2>
          <p className="subtext">Stay on track. Your health matters 💊</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card large">
            <h3>Streak 🔥</h3>
            <p>
              <strong>{streak}</strong> days
            </p>
          </div>
          <div className="stat-card large">
            <h3>Today’s Status ✅</h3>
            <p>
              <strong>{todayStatus}</strong>
            </p>
          </div>
          <div className="stat-card large">
            <h3>Next Dose ⏰</h3>
            <p>
              At <strong>{nextDose}</strong>
            </p>
          </div>
          <div className="stat-card large">
            <h3>Refills Needed 🧾</h3>
            <p>
              <strong>{refills}</strong> due
            </p>
          </div>
        </div>

        <div className="form-section">
          <h3>Update Medication</h3>
          <form onSubmit={handleMedicationSubmit} className="medication-form">
            <select
              name="id"
              value={medicationForm.id}
              onChange={handleFormChange}
              required
            >
              <option value="">Select Medication</option>
              {medications.map((med) => (
                <option key={med.id} value={med.id}>
                  {med.name}
                </option>
              ))}
            </select>

            <select
              name="status"
              value={medicationForm.status}
              onChange={handleFormChange}
              required
            >
              <option value="taken">Taken</option>
              <option value="missed">Missed</option>
              <option value="pending">Pending</option>
            </select>

            <input
              name="notes"
              value={medicationForm.notes}
              onChange={handleFormChange}
              placeholder="Optional notes..."
            />

            <button type="submit">Update Medication</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
