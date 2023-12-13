import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import About from "./pages/About";

import 'bootstrap/dist/css/bootstrap.css';
import { UserProvider } from "./UserState";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/about" element={<About />}></Route>

        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
export default App;
