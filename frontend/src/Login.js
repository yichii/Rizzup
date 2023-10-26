import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Send a POST request to server's /login route with the form data
    const response = await fetch("http://localhost:3001/login", {
      // Same port/route in backend api.js
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      setUsername("");
      setPassword("");
      setErrorMessage("");
      navigate("/home");
    } else {
      setErrorMessage(
        "Error incorrect user or password data. Please try again."
      );
    }
  };
  return (
    <>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleOnSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="********"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?<a href="/register">Register</a>
        </p>
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </>
  );
}
export default Login;
