import { HomeOutlined, PieChartOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import "../css/Nav.css";

const Nav = () => {
  return (
    <nav>
      <Menu mode="inline" defaultSelectedKeys={['mail']}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <NavLink
            to="/"
            isActive={(match, location) => location.pathname === "/charts"}
          >
            Home
          </NavLink>
        </Menu.Item>

        <Menu.Item key="charts" icon={<PieChartOutlined />}>
          <NavLink
            to="/charts"
            isActive={(match, location) => location.pathname === "/charts"}
          >
            Charts
          </NavLink>
        </Menu.Item>

        <Menu.Item key="settings" icon={<SettingOutlined />}>
          <NavLink
            to="/settings"
            isActive={(match, location) => location.pathname === "/charts"}
          >
            Settings
          </NavLink>
        </Menu.Item>
      </Menu>
    </nav>
  );
};

export default Nav;
