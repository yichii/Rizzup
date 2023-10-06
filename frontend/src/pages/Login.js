
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";



const Login = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    const res = await fetch(API_URL + "users/login/", {
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
      <section> 
        
        <div className="container-fluid row p-0 m-0 vh-100">
          <div className="col-sm-5 login-box m-auto">
            <div class="px-5 ms-xl-4">
              <a class="navbar-brand" href="#top">
                <img src="https://trello.com/1/cards/644ded15a031667f9e444cde/attachments/644ded1929ab9db5065e96fa/download/21443747-removebg-preview.png" width="50" height="50" alt=""></img>
              </a>
              <span class="h1 fw-bold mb-0 text-black">Rizz Up</span>
            </div>
            <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mb-5 pt-xl-0 mt-xl-n5">
              <form>
                <h1 className="mt-3 mb-2 font-weight-bold text-black">Enter the World of Rizz</h1>
                <h5 className="mb-4 mt-  text-black ">
                  {" "}
                  More than 0 questions are waiting for your wise suggestions!{" "}
                </h5>
                <div class="form-outline mb-4">
                  <input
                    type="text"
                    id="username_input"
                    class="form-control"
                    value={formData.username}
                    name="username"
                    onChange={handleFormDataChange}
                    placeholder="Username"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    id="password_input"
                    className="form-control"
                    value={formData.password}
                    name="password"
                    onChange={handleFormDataChange}
                    placeholder="Password"
                  />
                </div>
                <ErrorAlert error={error} />
                <button
                  type="Login"
                  class="w-100 btn btn:hover border-0 mt-1"
                  onClick={handleSubmitClick}
                >
                  Login
                </button>
                <h6 className="mt-2 mb-5" style={{ color: "#5e5e5e" }}>
                  {"  "}
                  Don't have a RizzUp account yet?{" "}
                  <Link to="/register" style={{ color: "#F28123" }}>
                    Register
                  </Link>{" "}
                </h6>
              </form>
            </div>
          </div>
          <div className="col-sm-7 px-0 d-none d-sm-block vh-100">
            <img
              src="https://static.wixstatic.com/media/ee95fb_6898367a40f944d295dea95fcd1e0df5~mv2.jpg/v1/fill/w_952,h_941,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ee95fb_6898367a40f944d295dea95fcd1e0df5~mv2.jpg"
              alt="Login cover"
              class="w-100 vh-100 d-inline-block"
              style={{ objectFit: "cover", objectPosition: "right" }}
            />
          </div>
        </div>
        
      </section>
    </div>
  );
};


// export default Login;
