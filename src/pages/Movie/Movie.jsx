import React, { useState } from "react";
import { Row, Col, Button, Alert } from "antd";
import { RightCircleOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import moment from "moment";
import { useMovie, useMovieVideos } from "../../hooks/useMovies";
import {Loading, ModalVideo } from "../../components/index";


const Movie = () => {
  const { id } = useParams();
  const { data: movieInfo, isLoading, isError, error } = useMovie(id);

  if (isLoading || !movieInfo) return <Loading />;
  if (isError) return <Alert message="Error" description={error?.message} type="error" showIcon />;

  return <RenderMovie movieInfo={movieInfo} />;
};

const RenderMovie = ({ movieInfo }) => {
  const { backdrop_path, poster_path } = movieInfo;
  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative py-30 px-40"
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-start gap-10">
        {/* Poster */}
        <div className="w-full md:w-1/3 shrink-0">
          <div
            className="w-full h-[450px] bg-cover bg-center rounded-md shadow-xl"
            style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${poster_path}')` }}
          />
        </div>

        {/* Información */}
        <div className="w-full md:w-2/3 text-white space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            {movieInfo.title}{" "}
            <span className="ml-3 text-red-600 font-bold text-3xl">
              ({moment(movieInfo.release_date).format("YYYY")})
            </span>
          </h1>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-red-500">General</h3>
              <p className="text-gray-300 text-lg leading-relaxed">{movieInfo.overview}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-red-500">Géneros</h3>
              <ul className="flex flex-wrap gap-3 text-gray-300">
                {movieInfo.genres.map((g) => (
                  <li
                    key={g.id}
                    className="bg-[#222] px-4 py-2 rounded-full text-sm border border-gray-700"
                  >
                    {g.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Botón de trailer */}
            {movieInfo.id && <MovieTrailerButton movieId={movieInfo.id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente interno para el botón de trailer
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
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition"
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
