import React, { useState } from "react";

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
    <>
      <h1>This is Rizz</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
