import { useEffect, useState } from "react";
import "./style.css";

const PatientDashboard = () => {
  const [streak, setStreak] = useState(0);
  const [todayStatus, setTodayStatus] = useState("Not done");
  const [percentage, setPercentage] = useState(0);
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState(null);
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
    const token = localStorage.getItem("jwtToken");
    const username = localStorage.getItem("username");
    const id = localStorage.getItem("userid");
    setUsername(username);
    setUserid(id);

    const fetchStreak = async () => {
      try {
        const res = await fetch(
          `https://medication-api-b2jz.onrender.com/patient/${id}/streak`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setStreak(data.streak || 0);
      } catch (err) {
        console.error("Error fetching streak", err);
      }
    };

    const fetchTodayStatus = async () => {
      try {
        const res = await fetch(
          `https://medication-api-b2jz.onrender.com/patient/${id}/today-status`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setTodayStatus(data.status || "No data");
      } catch (err) {
        console.error("Error fetching today's status", err);
      }
    };

    const fetchMonthlyPercentage = async () => {
      try {
        const res = await fetch(
          `https://medication-api-b2jz.onrender.com/patient/${id}/monthly-percentage`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setPercentage(data.percentage || 0);
      } catch (err) {
        console.error("Error fetching monthly percentage", err);
      }
    };

    const fetchMedications = async () => {
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
        console.error("Error fetching medications", err);
      }
    };

    if (id && token && username) {
      fetchStreak();
      fetchTodayStatus();
      fetchMonthlyPercentage();
      fetchMedications();
    }
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
      medicationName:
        medications.find((med) => med.id === parseInt(medicationForm.id))
          ?.name || "",
      status: medicationForm.status,
      notes: medicationForm.notes,
    };

    if (!payload.medicationName || !payload.status) {
      alert("Please select a medication and status.");
      return;
    }

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
        alert("Medication status updated successfully");
        setMedicationForm({ id: "", status: "taken", notes: "" });
      } else {
        const err = await res.json();
        alert(err?.error || "Failed to update medication");
      }
    } catch (err) {
      console.error("Server error", err);
      alert("Server error");
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
            <h3>Monthly % 📈</h3>
            <p>
              <strong>{percentage}%</strong> taken
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
