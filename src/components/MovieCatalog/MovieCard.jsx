import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { message } from "antd";

const MovieCard = ({ movie, isFavorite = false, onToggleFavorite, isAuthenticated = false }) => {
  const { id, title, poster_path } = movie;
  const posterPath = `https://image.tmdb.org/t/p/original${poster_path}`;
  const navigate = useNavigate();

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Validar autenticación
    if (!isAuthenticated) {
      message.warning('Inicia sesión para guardar favoritos');
      navigate('/login');
      return;
    }
    
    if (onToggleFavorite) onToggleFavorite(movie);
  };

  return (
    <Link to={`/movie/${id}`} className="group">
      <div className="bg-[#1f1f1f] rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {/* Imagen */}
        <div className="relative">
          <img
            src={posterPath}
            alt={title}
            className="w-full h-[360px] object-cover"
          />

          {/* Overlay al hacer hover */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <EyeOutlined className="text-white text-2xl" />
          </div>
        </div>

        {/* Título */}
        <div className="p-3">
          <h3 className="text-white font-semibold text-lg line-clamp-2">
            {title}
          </h3>
          <div className="mt-2 flex gap-2">
            <button className="flex-1 bg-[#E50914] text-white py-1 rounded hover:bg-[#B20710] transition-colors duration-300">
              Ver más
            </button>
            <button onClick={handleToggle} className="w-10 h-10 flex items-center justify-center rounded bg-[#222] text-red-500 hover:bg-[#2b2b2b]">
              {isFavorite ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

