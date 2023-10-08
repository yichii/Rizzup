import React, { useState } from "react";
import Login from "./pages/LoginTest";
import Home from './pages/Home';
import Register from "./pages/RegisterTest";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/register" element={<Register></Register>} />
        </Routes>
      </BrowserRouter>
    </div>
   
  );
}
export default App;
