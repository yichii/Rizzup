import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <Link to="/">
              <img
                src="https://trello.com/1/cards/644ded15a031667f9e444cde/attachments/644ded1929ab9db5065e96fa/previews/644ded1a29ab9db5065e9706/download/21443747-removebg-preview.png"
                alt="Rizz Up"
                style={{ height: "60px" }}
              />
              <span className="Logo Name">RizzUp</span>
            </Link>
          </a>

          <MobileNav
            user={user}
            handleLogout={handleLogout}
            notificationCount={notificationCount}
          />
          <DesktopNav
            user={user}
            handleLogout={handleLogout}
            notificationCount={notificationCount}
          />
        </div>
      </nav>
    </div>
  );
};
