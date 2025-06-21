import { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./style.css";

const Caretaker = () => {
  const [medications, setMedications] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: "",
    time: "",
    start_date: "",
    end_date: "",
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: "", password: "" });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const caretakerName = localStorage.getItem("username");
  const caretakerId = localStorage.getItem("userid");

  useEffect(() => {
    fetchMedications();
    fetchPatients();
  }, []);

  const fetchMedications = async () => {
    try {
      const res = await fetch(
        `https://medication-api-b2jz.onrender.com/medications?caretaker=${caretakerName}`
      );
      const data = await res.json();
      setMedications(data);
    } catch (err) {
      console.error("Failed to fetch medications", err);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await fetch(
        `https://medication-api-b2jz.onrender.com/patients?caretaker=${caretakerName}`
      );
      const data = await res.json();
      setPatients(data);
      if (data.length > 0) setSelectedPatient(data[0].id);
    } catch (err) {
      console.error("Failed to fetch patients", err);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddMedication = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      patient_id: selectedPatient,
    };

    try {
      const res = await fetch(
        "https://medication-api-b2jz.onrender.com/add-medication",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        alert("Medication added successfully");
        fetchMedications();
        setFormData({
          name: "",
          dosage: "",
          frequency: "",
          time: "",
          start_date: "",
          end_date: "",
        });
      } else {
        console.error("Failed to add medication");
      }
    } catch (err) {
      console.error("Server error", err);
    }
  };

  const handleAddPatient = async () => {
    try {
      const res = await fetch("https://medication-api-b2jz.onrender.com/add-patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newPatient, caretakerId }),
      });

      if (res.ok) {
        alert("Patient added successfully");
        fetchPatients();
        setShowAddModal(false);
        setNewPatient({ name: "", password: "" });
      } else {
        console.error("Failed to add patient");
      }
    } catch (err) {
      console.error("Error adding patient", err);
    }
  };

  return (
    <>
      <Header />

      <div className="dashboard-container">
        <div className="dashboard-card">
          <div className="dashboard-header">
            <div className="top-bar">
              <h2 className="page-title">
                {getGreeting()}, {caretakerName} 👋
              </h2>
              <button className="add-button" onClick={() => setShowAddModal(true)}>
                + Add Patient
              </button>
            </div>
            <p className="subtext">You're making a difference every day 💙</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card large">
              <h3>Assigned Patients 🧑‍⚕️</h3>
              <p><strong>{patients.length}</strong> total</p>
            </div>
            <div className="stat-card large">
              <h3>Medications Added 💊</h3>
              <p><strong>{medications.length}</strong> total</p>
            </div>
          </div>

          <div className="form-section">
            <h3>Add Medication</h3>
            <form onSubmit={handleAddMedication} className="medication-form">
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                required
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Medication Name"
                required
              />
              <input
                name="dosage"
                value={formData.dosage}
                onChange={handleInputChange}
                placeholder="Dosage (e.g., 500mg)"
              />
              <input
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
                placeholder="Frequency (e.g., 2x/day)"
              />
              <input
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                placeholder="Times (e.g., 08:00 AM)"
              />
              <input
                name="start_date"
                type="date"
                value={formData.start_date}
                onChange={handleInputChange}
              />
              <input
                name="end_date"
                type="date"
                value={formData.end_date}
                onChange={handleInputChange}
              />
              <button type="submit">Add Medication</button>
            </form>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Patient</h3>
            <input
              type="text"
              placeholder="Patient Name"
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={newPatient.password}
              onChange={(e) => setNewPatient({ ...newPatient, password: e.target.value })}
            />
            <div className="modal-buttons">
              <button onClick={handleAddPatient}>Add</button>
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Caretaker;
