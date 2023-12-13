import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const UserProfilePage = () => {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    fetchUserData();
  }, [username]);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`http://localhost:3001/users/${username}`, {
        method: "GET",
        headers: {},
      });
      const data = await res.json();
      const token = data.token;
      localStorage.getItem("token", token);
      setProfileUser(data.username);
      setEmail(data.email);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="main-body">
          <nav aria-label="breadcrumb" className="main-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/home">Home</a></li>
              <li className="breadcrumb-item"><a href=" ">User</a></li>
              <li className="breadcrumb-item active" aria-current="page">User Profile</li>
            </ol>
          </nav>

          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Profile" className="rounded-circle" width="150" />
                    <div className="mt-3">
                      <h4>{profileUser}</h4>
                      <p className="text-secondary mb-1">Rizz Master</p>
                      <p className="text-muted font-size-sm"></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  {/* Add social media links here */}
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  {/* Add user details here */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Username</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {profileUser}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {email}
                    </div>
                  </div>
                  <hr />
                  {/* Add more user details */}
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default UserProfilePage;
