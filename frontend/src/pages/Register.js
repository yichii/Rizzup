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

  const handleSubmitClick = async (e) => {
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
            <h1 className="mt-3 mb-2" style={{ color: "#F28123" }}>
              Join RizzUp community
            </h1>
            <h5 className=" mb-4" style={{ color: "#5e5e5e" }}>
              {"  "}
              Learn and share how to Rizz someone up from the community.{" "}
            </h5>
            <form>
              <div className="mb-3" style={{ color: "#F28123" }}>
                <label className="form-label" style={{ color: "#F28123" }}>
                  <i
                    class="fa-regular fa-envelope mx-1"
                    style={{ color: "#5e5e5e" }}
                  ></i>
                  {"  "}
                  Email address
                </label>
                <input
                  value={formData.email}
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={handleFormDataChange}
                />
                <div className="form-text" style={{ color: "#F28123" }}>
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className=" mb-3" style={{ color: "#F28123" }}>
                <label className="form-label">
                  {" "}
                  <i
                    className="fa-regular fa-circle-user mx-1"
                    style={{ color: "#5e5e5e" }}
                  ></i>{" "}
                  Username
                </label>
                <input
                  value={formData.username}
                  type="text"
                  className="form-control"
                  name="username"
                  onChange={handleFormDataChange}
                />
              </div>
              <div className="mb-3" style={{ color: "#F28123" }}>
                <label className="form-label">
                  <i
                    class="fa-solid fa-lock mx-1"
                    style={{ color: "#5e5e5e" }}
                  ></i>{" "}
                  Password
                </label>
                <input
                  value={formData.password}
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handleFormDataChange}
                />
              </div>
              <ErrorAlert error={error} />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmitClick}
              >
                Submit
              </button>
              <h6 className="mt-2" style={{ color: "#5e5e5e" }}>
                {"  "}
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#F28123" }}>
                  Login
                </Link>{" "}
              </h6>
            </form>
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
