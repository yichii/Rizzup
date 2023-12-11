import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const UserProfilePage = () => {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState();
  const [biography, setBiography] = useState("");

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
      setBiography(data.biography || "");
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleBiographyChange = (event) => {
    setBiography(event.target.value);
  };

  const saveBiography = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/users/${username}/biography`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ biography }),
      });
      const data = await response.json();
      console.log("Biography saved successfully:", data);
    } catch (error) {
      console.error("Error saving biography:", error);
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
                      <h6 className="mb-0">Full Name</h6>
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
                      {profileUser ? `${profileUser.toLowerCase()}@example.com` : ""}
                    </div>
                  </div>
                  <hr />
                  {/* Add more user details */}
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Relationship Status</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {"Single"}
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>

          {/* Biography Section */}
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-3">
                <div className="card-body">
                  <h6 className="d-flex align-items-center mb-3">
                    <i className="material-icons text-info mr-2"></i>Biography
                  </h6>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={biography}
                    onChange={handleBiographyChange}
                  />
                  <button className="btn btn-primary mt-3" onClick={saveBiography}>
                    Save Biography
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
