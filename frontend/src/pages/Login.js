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
              src="https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=1098,format=auto/sites/default/files/styles/1200x800/public/images/methode/2018/09/17/a9c2eed6-b4c5-11e8-89ab-e29b0678280a_1280x720_135442.PNG?itok=jtooF5gj"
              alt=""
              style={{ width: "600px" }}
            />
          </div>
          <div className="col-sm-6 login-box mt-5">
            <h1 className="mt-3 mb-2">Login</h1>
            <h5 className=" mb-4" style={{ color: "#5e5e5e" }}>
              {" "}
              Welcome back to RizzUp!{" "}
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
