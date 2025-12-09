import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-black text-white">
      {/* Logo estilo Netflix */}
      <div className="absolute top-6 left-6 text-red-600 font-extrabold text-2xl tracking-tight select-none">
        NEFLEX
      </div>

      <div className="w-full max-w-2xl mx-4 text-center p-8 rounded-lg">
        <div className="mb-8">
          <h1 className="text-7xl sm:text-[8rem] font-extrabold leading-none">404</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold mt-2">Página no encontrada</h2>
        </div>

        <p className="text-sm sm:text-base text-gray-300 mb-8">
          Lo sentimos — la página que buscas no existe o fue movida.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-2xl font-medium bg-red-600 hover:bg-red-700 active:bg-red-800 transition-shadow shadow-md focus:outline-none focus:ring-4 focus:ring-red-700/30"
          >
            Volver al inicio
          </Link>

          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-2xl font-medium border border-gray-700 text-gray-200 hover:bg-white/5 transition"
          >
            Ir a catálogo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
