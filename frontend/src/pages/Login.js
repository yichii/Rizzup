import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Send a POST request to server's /login route with the form data
    const response = await fetch("http://localhost:3001/login", {
      // Same port/route in backend api.js
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      setUsername("");
      setPassword("");
      setErrorMessage("");
      navigate("/home");
    } else {
      setErrorMessage(
        "Error incorrect user or password data. Please try again."
      );
    }
  };
  return (
    <div>
      <section> 
        
        <div className="container-fluid row p-0 m-0 vh-100">
          <div className="col-sm-5 login-box m-auto">
            
            <div class="form-box align-items-center h-custom-2 mb-5 pt-xl-0 mt-xl-n5">
              <div>
                <a class="navbar-brand" href="#top">
                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fwhsr-january-flaticon-set%2F512%2Frocket.png&f=1&nofb=1&ipt=57047b82dd003e3d4952c651f202fc9311882220c5ff5997ae6df133536d075f&ipo=images" width="50" height="50" alt=""></img>
                </a>
                <span class="h1 fw-bold mb-0 text-black">Rizz Up</span>
              </div>
              <form onSubmit={handleOnSubmit}>
                <h1 className="mt-3 mb-4 text-black fs-3 fw-bold">Enter the World of Rizz</h1>
                <h5 className="mb-4 fw-normal text-black">
                  {" "}
                  Elevate connections and coaching with your insights! Join in - where your wisdom sparks change.{" "}
                </h5>
                <div class="mb-4">
                  <input
                    type="text"
                    placeholder="Username"
                    id="username_input"
                    class="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    id="password_input"
                    class="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                {errorMessage && <p className="error mt-3">{errorMessage}</p>}
                <button
                  type="Login"
                  class="w-100 border-0 btn btn-primary"
                >
                  Login
                </button>
                <p className="mt-2 mb-5" style={{ color: "#5e5e5e" }}>
                  Don't have an account? <a className="a-link" href="/register">Register</a>
                </p>
              </form>
            </div>
          </div>
          <div className="col-sm-7 px-0 d-none d-sm-block vh-100">
            <img
              src="https://static.wixstatic.com/media/ee95fb_6898367a40f944d295dea95fcd1e0df5~mv2.jpg/v1/fill/w_952,h_941,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ee95fb_6898367a40f944d295dea95fcd1e0df5~mv2.jpg"
              alt="Login page cover"
              class="w-100 vh-100 d-inline-block"
              style={{ objectFit: "cover", objectPosition: "right" }}
            />
          </div>
        </div>
        
      </section>
    </div>
  );
};

export default Login;
