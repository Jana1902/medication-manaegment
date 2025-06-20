import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [personType, setPersonType] = useState("patient");

  const [isError, setIsError] = useState(false);
  const [errType, setErrType] = useState("");

  const navigate = useNavigate();

  const onRegister = (event) => {
    event.preventDefault();

    if (!username || !password1 || !password2) {
      setIsError(true);
      setErrType("empty");
    } else if (password1 !== password2) {
      setIsError(true);
      setErrType("match");
    } else if (password1.length < 8) {
      setIsError(true);
      setErrType("length");
    } else {
      setIsError(false);
      setErrType("");
      alert(`Registered as ${personType}!`);
      navigate("/login");
    }
  };

  const renderError = () => {
    if (!isError) return null;

    switch (errType) {
      case "empty":
        return (
          <p className="error-msg">*Username or Password should not be empty</p>
        );
      case "length":
        return (
          <p className="error-msg">
            *Password must contain at least 8 characters
          </p>
        );
      case "match":
        return <p className="error-msg">*Passwords do not match</p>;
      default:
        return null;
    }
  };

  return (
    <div className="login-container">
      <div className="login-sub-container">
        <div className="login-card">
          <img src="pills-prescription.avif" alt="app" />
        </div>

        <form onSubmit={onRegister}>
          <h1>Register</h1>

          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password1">PASSWORD</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password1"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />

          <label htmlFor="password2">RE-TYPE PASSWORD</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />

          <div className="show-password">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <label htmlFor="showPassword" className="show-text">
              Show Password
            </label>
          </div>

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

          <button type="submit">Register</button>
          <div className="error-container">{renderError()}</div>
        </form>
      </div>
    </div>
  );
};

export default Register;
