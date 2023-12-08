import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import axios from "axios";

const UserProfilePage = () => {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUserData();
  }, [username, token]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3001/users/${username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });
      setProfileUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="my-4" style={{ color: "var(--bs-ternary)" }}>
          {profileUser ? `${profileUser.username}'s Profile` : "Loading..."}
        </h2>
        {profileUser ? (
          <div className="row">
            <div className="col-sm-4">
              <div className="card" style={{ height: "350px", border: "1px solid black" }}>
                {/* Display user details as needed */}
                <div>
                  <h4>About {profileUser.username}</h4>
                  <p>Email: {profileUser.email}</p>
                  {/* Add other user details you want to display */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;