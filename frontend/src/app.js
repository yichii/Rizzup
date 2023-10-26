import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Home from "./pages/Home";
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
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
export default App;
