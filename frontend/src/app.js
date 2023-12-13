//import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import 'bootstrap/dist/css/bootstrap.css';
import { UserProvider } from "./UserState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/users/:username" element={<UserProfilePage/>} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
export default App;
