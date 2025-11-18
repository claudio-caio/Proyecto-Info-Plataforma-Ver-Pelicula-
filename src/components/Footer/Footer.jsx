import React from "react";

const FooterComponent = () => {
  return (
    <div
      className="
        bg-[#111] 
        text-white 
        text-center 
        py-6 
        mt-10
      "
    >
      <p className="text-sm opacity-80 py-1.5">
        © {new Date().getFullYear()} Todos los derechos reservados.
      </p>
      <p className="text-sm opacity-80 py-1.5">
        Desarrollado por Claudio Tomadin.
      </p>
       <p className="text-sm opacity-80 py-1.5">
        Trabajo desarrollado para el Informatorio Chaco.
      </p>
    </div>
  );
};

export default FooterComponent;



