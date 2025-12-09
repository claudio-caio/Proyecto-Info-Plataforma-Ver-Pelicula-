import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { message } from "antd";

const MovieCard = ({
  movie,
  isFavorite = false,
  onToggleFavorite,
  isAuthenticated = false
}) => {
  const { id, title, poster_path } = movie;
  const posterPath = `https://image.tmdb.org/t/p/original${poster_path}`;
  const navigate = useNavigate();

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      message.warning("Inicia sesión para guardar favoritos");
      navigate("/login");
      return;
    }

    if (onToggleFavorite) onToggleFavorite(movie);
  };

  return (
    <Link
      to={`/movie/${id}`}
      className="
        group block
        hover:scale-[1.03] transition-transform
        duration-300
      "
    >
      <div
        className="
          bg-[#1f1f1f] rounded-lg overflow-hidden shadow-lg 
          hover:shadow-2xl transition-shadow
          duration-300
        "
      >
        {/* Imagen */}
        <div className="relative">
          <img
            src={posterPath}
            alt={title}
            className="
              w-full 
              h-[260px] sm:h-80 md:h-[360px] lg:h-[420px]
              object-cover transition-all duration-300
            "
          />

          {/* Overlay hover */}
          <div
            className="
              absolute inset-0 bg-black/40 opacity-0 
              group-hover:opacity-100 
              transition-opacity duration-300 
              flex items-center justify-center
            "
          >
            <EyeOutlined className="text-white text-3xl drop-shadow-md" />
          </div>

          {/* Botón Favorito en esquina */}
          <button
            onClick={handleToggle}
            className="
              absolute top-3 right-3 z-20
              w-10 h-10 rounded-full 
              bg-black/60 backdrop-blur-sm
              flex items-center justify-center
              text-red-500 hover:bg-black/80
              transition-colors
            "
          >
            {isFavorite ? (
              <HeartFilled style={{ color: "#ff4d4f" }} className="text-xl" />
            ) : (
              <HeartOutlined className="text-xl" />
            )}
          </button>
        </div>

        {/* Título */}
        <div className="p-3">
          <h3
            className="
              text-white font-semibold
              text-base sm:text-lg
              line-clamp-2
            "
          >
            {title}
          </h3>

          {/* Botón de Ver más (mobile friendly) */}
          <button
            className="
              mt-3 w-full
              bg-[#E50914] text-white 
              py-2 rounded-md 
              hover:bg-[#B20710] 
              transition-colors duration-300
              font-medium
            "
          >
            Ver más
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;


