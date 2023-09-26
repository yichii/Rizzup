import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to server's /login route with the form data
    const response = await fetch("http://localhost:3001/login", {
      // Same port/route in backend api.js
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, email }),
    });

    if (response.ok) {
      alert("Data saved successfully");
      setEmail("");
      setText("");
    } else {
      console.error("Error saving data");
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/login" element={<Login></Login>} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}


export default App;
