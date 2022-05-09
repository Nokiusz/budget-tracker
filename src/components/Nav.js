import React from "react";
import { FaChartPie, FaCog, FaHome, FaPlus } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

import "../css/Nav.css";

const Nav = () => {
  return (
    <nav>
      <NavLink
        to="/"
        isActive={(match, location) => location.pathname === "/charts"}
      >
        <FaHome />
      </NavLink>
      <NavLink
        to="/add"
        isActive={(match, location) => location.pathname === "/charts"}
      >
        <FaPlus />
      </NavLink>
      <NavLink
        to="/charts"
        isActive={(match, location) => location.pathname === "/charts"}
      >
        <FaChartPie />
      </NavLink>
      <NavLink
        to="/settings"
        isActive={(match, location) => location.pathname === "/charts"}
      >
        <FaCog />
      </NavLink>
    </nav>
  );
};

export default Nav;
