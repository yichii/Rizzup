import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import { Navbar } from "../components/Navbar";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    const res = await fetch(process.env.API_URL + "users/login/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
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
      <Navbar />
      <div className="container">
        <div className="row mt-4">
          <div className="col-sm-6">
            <img
              src="https://static.wixstatic.com/media/ee95fb_6898367a40f944d295dea95fcd1e0df5~mv2.jpg/v1/fill/w_952,h_941,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ee95fb_6898367a40f944d295dea95fcd1e0df5~mv2.jpg"
              alt=""
              style={{ width: "100%", height: "100%", left: "580px", top: "84px" }}
            />
          </div>
          <div className="col-sm-6 login-box mt-5">
            <h1 className="mt-3 mb-2">Enter the World of Rizz</h1>
            <h5 className=" mb-4" style={{ color: "#5e5e5e" }}>
              {" "}
              More than 0 questions are waiting for your wise suggestions!{" "}
            </h5>
            <form>
              <div className="mb-3">
                <label className="form-label">
                  <i
                    className="fa-regular fa-circle-user mx-1"
                    style={{ color: "#5e5e5e" }}
                  ></i>{" "}
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.username}
                  name="username"
                  onChange={handleFormDataChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <i
                    class="fa-solid fa-lock mx-1"
                    style={{ color: "#5e5e5e" }}
                  ></i>{" "}
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={formData.password}
                  name="password"
                  onChange={handleFormDataChange}
                />
              </div>
              <ErrorAlert error={error} />
              <button
                type="submit"
                className="btn btn-primary mt-1"
                onClick={handleSubmitClick}
              >
                Submit
              </button>
              <h6 className="mt-2" style={{ color: "#5e5e5e" }}>
                {"  "}
                Don't have a RizzUp account yet?{" "}
                <Link to="/register" style={{ color: "#F28123" }}>
                  Register
                </Link>{" "}
              </h6>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
