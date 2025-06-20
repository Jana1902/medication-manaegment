import { Link } from "react-router-dom";

import { useState } from "react";

import "./style.css";

const Login = () => {
  //   const [isError, updateError] = useState(false);
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [showPassword, setShowPw] = useState(false);

  return (
    <div className="login-container">
      <div className="login-sub-container">
        <div className="login-card">
          <img src="pills-prescription.avif" alt="app" />
        </div>
        <form>
          <h1>Login</h1>
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
          <button type="submit">Login</button>

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
