import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Images/Logo1.png";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [selectedRole, setSelectedRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleRoleChange = (event : any) => {
    setSelectedRole(event.target.value);
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post("/api/user/userlogin", {
        email,
        password,
      });
      switch (response.data.user_type) {
        case "manager":
          navigate("/Manager");
          break;
        case "developer":
          navigate("/Developer");
          break;
        case "qa":
          navigate("/QA");
          break;
        default:
          setError("Invalid user type");
          break;
      }
    } catch (error) {
      setError("An error occurred while logging in.");
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post("/api/user/postItem", {
        name,
        email,
        password,
        user_type: selectedRole,
      });
      switch (response.data.authObj.user_type) {
        case "manager":
          navigate("/Manager");
          break;
        case "developer":
          navigate("/Developer");
          break;
        case "qa":
          navigate("/QA");
          break;
        default:
          setError("Invalid user type");
          break;
      }
      if (response.status === 201) {
        setName("");
        setEmail("");
        setPassword("");
        setSelectedRole("manager");
        setError("");
      }
    } catch (error) {
      setError("An error occurred while registering.");
    }
  };
  return (
    <div className="main-div">
    <div className={`container ${isSignUp ? "" : "right-panel-active"}`}>
      <div className="form-container sign-up-container">
        <form action="#">
          <img src={Logo} alt="" className="logo" />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select id="role" value={selectedRole} onChange={handleRoleChange}>
            <option value="" disabled>
              Select Role
            </option>
            <option value="manager">Manager</option>
            <option value="developer">Developer</option>
            <option value="qa">QA</option>
          </select>
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleSignUp}>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
          <img src={Logo} alt="" className="logo" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignIn}>Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div
            className={`overlay-panel ${
              isSignUp ? "overlay-right" : "overlay-left"
            }`}
          >
            {isSignUp ? (
              <>
                <h1>Hello, Bug!</h1>
                <p>
                  Enter your personal details and become a debugger with us.
                </p>
                <button className="ghost" onClick={handleSignInClick}>
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <h2>Welcome Back!</h2>
                <p>
                  Already have an account? <br /> To keep connected with us,
                  please login
                </p>
                <button className="ghost" onClick={handleSignUpClick}>
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
