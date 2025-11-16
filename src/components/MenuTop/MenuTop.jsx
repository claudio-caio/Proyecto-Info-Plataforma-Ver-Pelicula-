import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import logoImage from "../../assets/img/logo.svg";

import "./MenuTop.scss";

const items = [
  {
    key: "1",
    label: (
      <Link to="/">
        <div className="menu-top__logo">
          <img src={logoImage} alt="Logo" />
        </div>
        Home
      </Link>
    ),
  },
  {
    key: "2",
    label: <Link to="/new-movies">Ultimos lanzamientos</Link>,
  },
  {
    key: "3",
    label: <Link to="/popular">Populares</Link>,
  },
  {
    key: "4",
    label: <Link to="/search">Buscador</Link>,
  },
];

const MenuTop = () => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      style={{ lineHeight: "64px" }}
      items={items}
    />
  );
};

export default MenuTop;
