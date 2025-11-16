import React from "react";
import { Row, Col } from "antd";
import PosterMovie from "./PosterMovie";
import MovieInfo from "./MovieInfo";

const RenderMovie = ({ movieInfo }) => {
  const { backdrop_path, poster_path } = movieInfo;

  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <Row
      className="movie"
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      <div className="movie__dark" />

      <Row>
        <Col xs={12} md={9} offset={3} className="movie__poster orden1">
          <PosterMovie image={poster_path} />
        </Col>

        <Col xs={24} md={10} className="movie__info orden2">
          <MovieInfo movieInfo={movieInfo} />
        </Col>
      </Row>
    </Row>
  );
};

export default RenderMovie;