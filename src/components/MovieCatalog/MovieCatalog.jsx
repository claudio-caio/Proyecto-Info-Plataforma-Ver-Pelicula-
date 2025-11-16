import React from "react";
import { Col } from "antd";
import MovieCard from "./MovieCard.jsx";

import "./MovieCatalog.scss";


const MovieCatalog = (props) => {
 const {
    movies: { results,total_results }
  } = props;

  if(total_results > 4 ){
    return results.map(movie => (

      <Col key={movie.id} xs={24} sm={12} md={8} lg={6} className="movie-catalog">
        <MovieCard movie={movie} />
      </Col>
      
    ));      
  }
  else{
    return results.map(movie => (

      <Col key={movie.id} xs={24} sm={12} lg={8} className="movie-catalog">
        <MovieCard movie={movie} />
      </Col>
      
    ));       
  }

}

export default MovieCatalog
