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

    // Send a POST request to server's /register route with the form data
    const response = await fetch("http://localhost:3001/login", {
      // Same port/route in backend api.js
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      alert("Data saved successfully");
      setUsername("");
      setPassword("");
      setErrorMessage("");
      navigate("/"); // Redirect to the login page after successful login
    } else {
      setErrorMessage("Error saving data. Please try again.");
    }
  };
  return (
    <>
      <h1>This is Rizz</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </>
  );
}
export default Login;
