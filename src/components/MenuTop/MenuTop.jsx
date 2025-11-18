import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";

const MenuTop = () => {
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
      </div>
    </nav>
  );
};

export default MenuTop;

