import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !email) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Send a POST request to server's /register route with the form data
    const response = await fetch("http://localhost:3001/register", {
      // Same port/route in backend api.js
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });

    if (response.ok) {
      alert("Data saved successfully");
      setEmail("");
      setUsername("");
      setPassword("");
      setErrorMessage("");
      navigate("/login"); // Redirect to the login page after successful registration
    } else {
      setErrorMessage("Error saving data. Please try again.");
    }
  };

  return (
    <>
      <div className="form-container">
        <h1>Registration</h1>
        <form onSubmit={handleOnSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <p>
          Have an account already?<a href="/login">Login</a>
        </p>
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </>
  );
}

export default Register;
