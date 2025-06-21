import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import cookies from "js-cookie";
import "./style.css";

const Login = () => {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [showPassword, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [personType, setPersonType] = useState("patient");

  const navigate = useNavigate();

  const submitLogin = async (event) => {
  event.preventDefault();
  setError("");

  if (!username || !password) {
    setError("Username and password are required.");
    return;
  }

  setLoading(true);

  const userDetails = {
    username,
    password,
    type: personType,
  };

  try {
    const res = await fetch("https://medication-api-b2jz.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("Login successful", data);
      localStorage.setItem("jwtToken", data.jwtToken);
      localStorage.setItem("username", data.username);
      localStorage.setItem("userid", data.userid);
      localStorage.setItem("type", data.type);
      cookies.set("jwtToken", data.jwtToken);
      navigate(`/${data.type}/${data.userid}`);
    } else {
      setError(data?.error || "Login failed. Please try again.");
    }
  } catch (err) {
    console.error("Login error:", err);
    setError("Unable to connect to server. Please try again later.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="login-container">
      <div className="login-sub-container">
        <form onSubmit={submitLogin}>
          <h1>Login</h1>

          <div className="radio-btn-group">
            <div className="radioCard">
              <input
                className="radioBtn"
                id="patientRadio"
                type="radio"
                name="personType"
                value="patient"
                checked={personType === "patient"}
                onChange={(e) => setPersonType(e.target.value)}
              />
              <label htmlFor="patientRadio">Patient</label>
            </div>

            <div className="radioCard">
              <input
                className="radioBtn"
                id="caretakerRadio"
                type="radio"
                name="personType"
                value="caretaker"
                checked={personType === "caretaker"}
                onChange={(e) => setPersonType(e.target.value)}
              />
              <label htmlFor="caretakerRadio">Caretaker</label>
            </div>
          </div>

          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => updateUsername(event.target.value)}
          />

          <label htmlFor="password">PASSWORD</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(event) => updatePassword(event.target.value)}
          />

          <div className="show-password">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPw((prevState) => !prevState)}
            />
            <label htmlFor="showPassword" className="show-text">
              Show Password
            </label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="error-msg">*{error}</p>}

          <p className="signup-info">
            Don't have an account?{" "}
            <Link to="/register">
              <span>Sign up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
