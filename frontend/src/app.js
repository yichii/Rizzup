import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import 'bootstrap/dist/css/bootstrap.css';
import { UserProvider } from "./UserState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from "./components/Posts";
import CreatePost from "./components/CreatePost";
import UserProfile from "./components/UserProfile";
import NotificationsPage from "./components/NotificationsPage";
import PostDetails from "./components/PostDetails";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/posts/:topicName" element={<Posts />} />
          <Route path="/posts/:topicName/:id" element={<PostDetails />} />
          <Route
            path="/posts/:topicName/create-post"
            element={<CreatePost />}
          />
          <Route path="/users/:username" element={<UserProfile />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
export default App;
