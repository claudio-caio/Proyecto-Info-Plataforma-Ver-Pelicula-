import { Button } from "antd";
import { Link } from "react-router-dom";

const Movie = ({ movie, isAuthenticated = false }) => {
  const { id, backdrop_path, title, overview } = movie;
  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div
      className="
        w-full
        h-[450px] sm:h-[520px] md:h-[600px]          
        flex items-center justify-center
        relative
        bg-cover bg-no-repeat bg-top
      "
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >

      {/* Overlay degradado */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent"></div>

      {/* Contenido */}
      <div
        className="
          relative 
          text-center 
          px-4 sm:px-6 
          max-w-xl 
          text-white
        "
      >
        <h2 className="
          text-2xl sm:text-3xl md:text-4xl 
          font-bold 
          mb-3 
          drop-shadow-lg
        ">
          {title}
        </h2>

        <p className="
          text-sm sm:text-base md:text-lg 
          mb-6
          opacity-90 
          line-clamp-3
        ">
          {overview}
        </p>

        <Link to={`/movie/${id}`}>
          <Button
            type="primary"
            className="
              bg-[#E50914]! 
              border-none! 
              hover:bg-[#B20710]! 
              px-6 py-2 sm:py-3 
              rounded-md
              text-sm sm:text-base
            "
          >
            Ver más
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Movie;




