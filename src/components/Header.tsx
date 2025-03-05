import React, { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./Header.css";
import logo from "../assets/circle-logo-blue.png";

const menuItems = [
  { name: "Catálogo", path: "/catalog" },
  { name: "Battle Simulator", path: "/battle" },
  { name: "Quiz", path: "/quiz" },
  { name: "Línea de Tiempo", path: "/timeline" },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="header">
      {/* Logo */}
      <Link to="/" className="logo-container">
        <img src={logo} alt="X-Men Logo" className="logo" />
      </Link>

      {/* Menú en escritorio */}
      <nav className="desktop-menu">
        <ul>
          {menuItems.map((item) => (
            <motion.li key={item.name} whileHover={{ scale: 1.1 }}>
              <Link to={item.path}>{item.name}</Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Botón del menú hamburguesa en móviles */}
      <button className="menu-button" onClick={toggleMenu}>
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Menú responsive en móviles */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu"
          >
            <ul>
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} onClick={() => setIsOpen(false)}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
