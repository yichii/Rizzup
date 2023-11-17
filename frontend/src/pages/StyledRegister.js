import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    const res = await fetch(process.env.API_URL + "users/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } else {
      setError(data.message);
    }
  };

  return (
    <div>
      <section>
        <div className="container-fluid row p-0 m-0 vh-100">
          <div className="col-sm-5 register-box m-auto">
            <div class="px-5 ms-xl-4">
              <a class="navbar-brand" href="#top">
                <img src="https://trello.com/1/cards/644ded15a031667f9e444cde/attachments/644ded1929ab9db5065e96fa/download/21443747-removebg-preview.png" width="50" height="50" alt=""></img>
              </a>
              <span class="h1 fw-bold mb-0 text-black">Rizz Up</span>
            </div>
            
            <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mb-5 pt-xl-0 mt-xl-n5">
              <form onSubmit={handleOnSubmit}>
                <h1 className="mt-3 mb-2 text-black" style={{ color: "#F28123" }}>
                  Join RizzUp community
                </h1>
                <h5 className=" mb-4 text-black" style={{ color: "#5e5e5e" }}>
                  {"  "}
                  Learn and share how to Rizz someone up from the community.{" "}
                </h5>
                <div className="form-outline mb-3" style={{ color: "#F28123" }}>
                  <input
                    value={username}
                    type="text"
                    className="form-control"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                </div>
                <div className="mb-3" style={{ color: "#F28123" }}>
                  <input
                    value={email}
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3" style={{ color: "#F28123" }}>
                  <input
                    value={formData.password}
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                {/* <div className="mb-3" style={{ color: "#F28123" }}>
                  <input
                    value={formData.confirmPassword}
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={handleFormDataChange}
                    placeholder="Confirm Password"
                  />
                </div> */}
                {errorMessage && <p className="error">{errorMessage}</p>}
                <button
                  type="submit"
                  className="w-100 btn btn:hover border-0 mt-1"
                >
                  Register
                </button>
                <p className="mt-2 mb-5" style={{ color: "#5e5e5e" }}>
                  Have an account already?<a href="/login">Login</a>
                </p>
              </form>
            </div>
          </div>
          <div className="col-sm-7 px-0 d-none d-sm-block vh-100">
            <img
              src="https://readthemike.com/wp-content/uploads/2023/02/21st-Century-Dating-YES-Magazine--1170x702.jpeg"
              alt="Register page cover"
              class="w-100 vh-100 d-inline-block"
              style={{ objectFit: "cover", objectPosition: "right" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
