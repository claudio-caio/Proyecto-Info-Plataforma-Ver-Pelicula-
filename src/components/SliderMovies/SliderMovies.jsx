import React from "react";
import { Carousel} from "antd";

import Loading from "../Loading/Loading.jsx";
import Movie from "./Movie";

import "./SliderMovies.scss";

const SliderMovies = ({ movies }) => {
  if (movies.loading || !movies.result) {
    return <Loading />;
  }

  const { results } = movies.result;

  return (
    <Carousel autoplay className="slider-movies">
      {results.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </Carousel>
  );
};

export default SliderMovies;
