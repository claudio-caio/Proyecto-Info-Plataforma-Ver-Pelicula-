import { Button } from "antd";
import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
  const { id, backdrop_path, title, overview } = movie;
  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
   <div
  className="
    w-full
    h-[550px]           
    flex items-center justify-center
    relative
    bg-cover
    bg-no-repeat
    bg-center_top     
  "
  style={{ backgroundImage: `url('${backdropPath}')` }}
>

      {/* Overlay degradado tipo Netflix */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>


      {/* Contenido centrado */}
      <div className="relative text-center px-6 max-w-2xl text-white">
        <h2 className="text-4xl font-bold mb-2 drop-shadow-lg py-15">{title}</h2>

        <p className="text-lg mb-4 opacity-90 line-clamp-3 pb-20">{overview}</p>

        <Link to={`/movie/${id}`}>
          <Button
            type="primary"
            className="bg-[#E50914]! border-none! hover:bg-[#B20710]! px-6 py-3 rounded-md"
          >
            Ver más
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Movie;



