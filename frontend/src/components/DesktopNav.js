import React from "react";
import { Link } from "react-router-dom";

const DesktopNav = (props) => {
  const { user: token, handleLogout, notificationCount } = props;
  return (
    <div className="desktop-nav">
      {token ? (
        <div className="navbar-design">
          <ul className="desktop navbar-nav">
            <li className="nav-item mx-2">
              <Link to={"/notifications"}>
                <i class="fa-regular fa-bell"></i> Notifications{" "}
                {notificationCount !== 0 && (
                  <span>{"(" + notificationCount + ")"}</span>
                )}
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link to={"/users/" + token.username}>
                <i class="fa-regular fa-user" /> {token.username}
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn mx-2" onClick={handleLogout}>
                Logout <i class="fa-solid fa-right-from-bracket"></i>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="navbar-nav nav">
          <div className="nav-link active mx-2">
            <div className="register fw-bold">
              <Link to="/register" className="text-decoration-none">
                <i className="fa-solid fa-user-plus mr-1"></i><span className="px-1"></span>Register
              </Link>{" "}
            </div>
          </div>
          <div className="nav-link active">
          <div className="login fw-bold ">
            <Link to="/login" className="text-decoration-none login border-0 p-0"> Login </Link>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopNav;
