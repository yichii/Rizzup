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
    const response = await fetch("http://localhost:3001/register", {
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
      navigate("/login");
    } else {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setErrorMessage(data.message);
      } else {
        // Handle non-JSON error response
        const text = await response.text();
        setErrorMessage(text);
      }
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
