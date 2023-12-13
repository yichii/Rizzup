import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !email) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }
    const response = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });

    if (response.ok) {
      setEmail("");
      setUsername("");
      setPassword("");
      setErrorMessage("");
      navigate("/login");
    } else {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setErrorMessage(data.message);
      } else {
        // Handle non-JSON error response
        const text = await response.text();
        setErrorMessage(text);
      }
    }
  };

  return (
    <div>
      <section>
        <div className="container-fluid row p-0 m-0 vh-100">
          <div className="col-sm-5 register-box m-auto">
            <div class="form-box align-items-center h-custom-2 mb-5 pt-xl-0 mt-xl-n5">
              <div>
                <a class="navbar-brand" href="#top">
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fwhsr-january-flaticon-set%2F512%2Frocket.png&f=1&nofb=1&ipt=57047b82dd003e3d4952c651f202fc9311882220c5ff5997ae6df133536d075f&ipo=images"
                    width="50"
                    height="50"
                    alt=""
                  ></img>
                </a>
                <span class="h1 fw-bold mb-0 text-black">Rizz Up</span>
              </div>
              <form onSubmit={handleOnSubmit}>
                <h1
                  className="mt-3 mb-4 text-black fs-3 fw-bold"
                  style={{ color: "#F28123" }}
                >
                  Join the Rizz Up community
                </h1>
                <h5
                  className="mb-4 fw-normal text-black"
                  style={{ color: "#5e5e5e" }}
                >
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
                    value={password}
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
                  className="w-100 btn btn-primary border-0 mt-1"
                >
                  Register
                </button>
                <p className="mt-2 mb-5" style={{ color: "#5e5e5e" }}>
                  Have an account already?{" "}
                  <a className="a-link" href="/login">
                    Login
                  </a>
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
}

export default Register;
