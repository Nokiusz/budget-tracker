import {
  HomeOutlined,
  PieChartOutlined,
  SettingOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import "../css/Nav.css";

const Nav = () => {
  return (
    <nav>
      <Menu mode="inline" defaultSelectedKeys={["123"]}>
        <Menu.Item key="home">
          <NavLink
            to="/"
            isActive={(match, location) => location.pathname === "/"}
          >
            <HomeOutlined />
          </NavLink>
        </Menu.Item>

        <Menu.Item key="charts">
          <NavLink
            to="/charts"
            isActive={(match, location) => location.pathname === "/charts"}
          >
            <PieChartOutlined />
          </NavLink>
        </Menu.Item>

        <Menu.Item key="filters">
          <NavLink
            to="/filters"
            isActive={(match, location) => location.pathname === "/filters"}
          >
            <FilterOutlined />
          </NavLink>
        </Menu.Item>

        <Menu.Item key="settings">
          <NavLink
            to="/settings"
            isActive={(match, location) => location.pathname === "/settings"}
          >
            <SettingOutlined />
          </NavLink>
        </Menu.Item>
      </Menu>
    </nav>
  );
};

export default Nav;
