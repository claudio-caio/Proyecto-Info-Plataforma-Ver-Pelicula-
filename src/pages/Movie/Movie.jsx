import React, { useState } from "react";
import { Button, Alert } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useMovie, useMovieVideos } from "../../hooks/useMovies";
import { Loading, ModalVideo } from "../../components/index";

const Movie = () => {
  const { id } = useParams();
  const { data: movieInfo, isLoading, isError, error } = useMovie(id);

  if (isLoading || !movieInfo) return <Loading />;
  if (isError)
    return (
      <Alert
        message="Error"
        description={error?.message}
        type="error"
        showIcon
      />
    );

  return <RenderMovie movieInfo={movieInfo} />;
};

const RenderMovie = ({ movieInfo }) => {
  const { backdrop_path, poster_path } = movieInfo;
  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div
      className="
        w-full min-h-screen bg-cover bg-center relative 
        px-4 sm:px-6 lg:px-12 py-15
      "
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/90 via-black/70 to-black/90"></div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-10">
        
        {/* Poster */}
        <div className="w-full md:w-1/3">
          <div
            className="
              w-full 
              h-[420px] sm:h-[500px] md:h-[560px] 
              bg-cover bg-center rounded-lg shadow-2xl
            "
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/original${poster_path}')`,
            }}
          />
        </div>

        {/* Información */}
        <div className="w-full md:w-2/3 text-white space-y-6">
          {/* Título */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            {movieInfo.title}
            <span className="ml-2 text-red-600 font-bold text-2xl sm:text-3xl">
              ({moment(movieInfo.release_date).format("YYYY")})
            </span>
          </h1>

          {/* Descripción */}
          <div className="space-y-4">
            <div>
              <h3 className="text-red-500 text-lg font-semibold">General</h3>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                {movieInfo.overview}
              </p>
            </div>

            {/* Géneros */}
            <div>
              <h3 className="text-red-500 text-lg font-semibold">Géneros</h3>
              <ul className="flex flex-wrap gap-2 sm:gap-3">
                {movieInfo.genres.map((g) => (
                  <li
                    key={g.id}
                    className="
                      bg-[#222] text-gray-300 text-sm 
                      px-3 py-1 rounded-full border border-gray-700
                    "
                  >
                    {g.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trailer */}
            {movieInfo.id && <MovieTrailerButton movieId={movieInfo.id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Botón trailer
const MovieTrailerButton = ({ movieId }) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const { data: videoMovie } = useMovieVideos(movieId);

  if (!videoMovie?.results?.length) return null;

  const video = videoMovie.results[0];

  return (
    <>
      <Button
        icon={<RightCircleOutlined />}
        onClick={() => setIsVisibleModal(true)}
        className="
          flex items-center gap-2 bg-red-600 
          hover:bg-red-700 text-white font-semibold 
          py-2 px-6 rounded-md shadow-lg transition
        "
      >
        Ver trailer
      </Button>

      <ModalVideo
        videoKey={video.key}
        videoPlatform={video.site}
        isOpen={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
      />
    </>
  );
};

export default Movie;

