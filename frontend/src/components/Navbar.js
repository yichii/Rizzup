//import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";



export const Navbar = () => {
  const user = localStorage.getItem("user");

  const navigate = useNavigate();
  //const [notificationCount, setNotificationCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow ml-10">
        <div className="container-fluid">
          <a className="navbar-brand" href="#top">
            <Link to="/home">
              <img
                src="./iconNoBG.png"
                alt="Rizz Up Icon"
                style={{ height: "35px" }}
              />
              <img
                src="./logoNoBG.png"
                alt="Rizz Up Logo"
                style={{ height: "30px" }}
                ></img>
            </Link>
          </a>
          <form class="form-inline col-md-5">
            <div class="input-group mx-auto">
              <div class="input-group-prepend my-auto">
                <i className="input-group-tex fa-solid fa-magnifying-glass pr-5 text-muted"></i>
              </div>
              <input type="text" className="form-control border-0 text-muted" placeholder= "Search by keywords..." aria-label="Username" aria-describedby="basic-addon1"></input>
            </div>
          </form>
          <MobileNav
            user={user}
            handleLogout={handleLogout}
            //notificationCount={notificationCount}
          />
          <DesktopNav
            user={user}
            handleLogout={handleLogout}
            //notificationCount={notificationCount}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;