import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { URL_API, API } from "../../utils/contants";
import Loading from "../../components/Loading/Loading.jsx";
import RenderMovie from "./RenderMovie";

import "./movie.scss";

const Movie = () => {
  const { id } = useParams();

  const movieInfo = useFetch(
    `${URL_API}/movie/${id}?api_key=${API}&language=es-ES`
  );

  if (movieInfo.loading || !movieInfo.result) {
    return <Loading />;
  }

  return <RenderMovie movieInfo={movieInfo.result} />;
};

export default Movie;
