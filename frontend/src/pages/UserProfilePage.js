import React, { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
//import Loading from "../components/Loading";
//import axios from "axios";
import UserAboutMe from "../components/UserAboutMe";

const UserProfilePage = () => {
  const [username, setUsername] = useState();
  //const token = localStorage.getItem("token");
  const [profileUser, setProfileUser] = useState();

  useEffect(() => {
    fetchUserData();
  });

  const fetchUserData = async () => {
    try {
      const res = await fetch(`http://localhost:3001/users/${username}`, {
        method: "GET",
        headers: {
          // "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`, 
        },
      });
      const data = await res.json();
      setUsername(data.username);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="my-4" style={{ color: "var(--bs-ternary)" }}>
          {username ? `${username}'s Profile` : "Loading..."}
        </h2>
        <div
                className="card"
                style={{ height: "350px", border: "1px solid black" }}
              >
                <UserAboutMe
                  profileUser={profileUser}
                  setProfileUser={setProfileUser}
                />
              </div>
      </div>
    </div>
  );
};

export default UserProfilePage;