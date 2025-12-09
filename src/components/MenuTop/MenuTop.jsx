import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { UserOutlined, LoginOutlined, LogoutOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import logo from "../../assets/img/logo.png";
import { AuthContext } from "../../context/auth";

const MenuTop = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#141414] text-white shadow-md fixed w-full z-50">
      <div className="max-w-8xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-[60px]" />
          <span className="text-2xl font-bold hover:text-[#e50914] transition-colors">
            MoviesApp
          </span>
        </Link>

        {/* Botón hamburguesa (solo mobile) */}
        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? <CloseOutlined /> : <MenuOutlined />}
        </button>

        {/* Menú Desktop */}
        <ul className="hidden md:flex items-center gap-8 text-lg">
          <li>
            <Link to="/NewMovies" className="hover:text-[#e50914]">Últimos lanzamientos</Link>
          </li>
          <li>
            <Link to="/Popular" className="hover:text-[#e50914]">Populares</Link>
          </li>
          <li>
            <Link to="/Search" className="hover:text-[#e50914]">Buscador</Link>
          </li>
        </ul>

        {/* Auth Desktop */}
        <div className="hidden md:flex items-center gap-4">
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

      {/* Menú Mobile */}
      {openMenu && (
        <div className="md:hidden bg-[#141414] px-6 pb-5">
          <ul className="flex flex-col gap-4 text-lg">
            <Link to="/NewMovies" onClick={() => setOpenMenu(false)}>
              Últimos lanzamientos
            </Link>
            <Link to="/Popular" onClick={() => setOpenMenu(false)}>
              Populares
            </Link>
            <Link to="/Search" onClick={() => setOpenMenu(false)}>
              Buscador
            </Link>
          </ul>

          {/* Auth Mobile */}
          <div className="mt-6 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Button
                  type="text"
                  icon={<UserOutlined />}
                  onClick={() => {
                    navigate("/profile");
                    setOpenMenu(false);
                  }}
                  style={{ color: "#aaa", fontSize: 14 }}
                >
                  {user?.name || "Usuario"}
                </Button>

                <Button
                  type="primary"
                  danger
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
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
                  onClick={() => {
                    navigate("/login");
                    setOpenMenu(false);
                  }}
                  style={{ backgroundColor: "#E50914", borderColor: "#E50914" }}
                >
                  Login
                </Button>

                <Button
                  type="default"
                  onClick={() => {
                    navigate("/register");
                    setOpenMenu(false);
                  }}
                  style={{ color: "#E50914", borderColor: "#E50914" }}
                >
                  Registro
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default MenuTop;



