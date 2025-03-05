import React from "react";
import { Link } from "react-router";
import "./Header.css";
import logo from "../assets/circle-logo-blue.png"; // Ajusta la ruta si es necesario

const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="X-Men Logo" className="logo" />
      </Link>
    </header>
  );
};

export default Header;
