import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import logo from "../../assets/img/logo.png";
import { AuthContext } from "../../context/auth";

const MenuTop = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#141414] text-white shadow-md fixed w-full z-50 " >
      <div className="max-w-8xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-[60px]" />
          <span className="text-2xl font-bold text-white hover:text-[#e50914] transition-colors ">MoviesApp</span>
        </Link>

        {/* Menú */}
        <ul className="flex items-center gap-8 text-lg">
          <li>
            <Link
              to="/NewMovies"
              className="text-white hover:text-[#e50914] transition-colors duration-300 font-medium"
            >
              Últimos lanzamientos
            </Link>
          </li>

          <li>
            <Link
              to="/Popular"
              className="text-white hover:text-[#e50914] transition-colors duration-300 font-medium"
            >
              Populares
            </Link>
          </li>

          <li>
            <Link
              to="/Search"
              className="text-white hover:text-[#e50914] transition-colors duration-300 font-medium"
            >
              Buscador
            </Link>
          </li>
        </ul>

        {/* Auth */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Button
                type="text"
                icon={<UserOutlined />}
                onClick={() => navigate("/profile")}
                style={{ color: "#aaa", fontSize: 14 }}
              >
                {user?.name || "Usuario"}
              </Button>
              <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                size="small"
                style={{ backgroundColor: "#cc0000", borderColor: "#cc0000" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                type="primary"
                icon={<LoginOutlined />}
                onClick={() => navigate("/login")}
                size="small"
                style={{ backgroundColor: "#E50914", borderColor: "#E50914" }}
              >
                Login
              </Button>
              <Button
                type="default"
                onClick={() => navigate("/register")}
                size="small"
                style={{ color: "#E50914", borderColor: "#E50914" }}
              >
                Registro
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MenuTop;


