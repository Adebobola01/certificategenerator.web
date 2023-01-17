import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/navbarIcon.png";
import "./logo.style.scss";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className="nav-logo" onClick={() => navigate("/")}>
      <h2>
        Cert<span>go</span>
      </h2>
      <img src={logo} alt="Certgo bulb" />
    </div>
  );
};

export default Logo;
