import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import logoImage from "../../assets/img/logo.svg";

import "./MenuTop.scss";

export default function MenuTop() {
  return (
    <div className="menu-top">
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{ lineHeight: "64px" }}
      >
        
        <Menu.Item key="1" >
          <Link to="/" >
            <div className="menu-top__logo" >
              <img src={logoImage} alt="Logo" />
            </div>
          </Link>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/new-movies">Ultimos lanzamientos</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/popular">Populares</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/search">Buscador</Link>
        </Menu.Item>
      </Menu>
  
    </div>
  );
}