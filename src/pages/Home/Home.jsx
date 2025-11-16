import React from "react";
import { Row, Col } from "antd";
import useFetch from "../../hooks/useFetch";
import { URL_API, API } from "../../utils/contants";
import {SliderMovies, MovieList, Footer } from '../../components'


const Home = () => {
  const newMovies = useFetch(
    `${URL_API}/movie/now_playing?api_key=${API}&language=es-ES&page=1`
  );
  const popularMovies = useFetch(
    `${URL_API}/movie/popular?api_key=${API}&language=es-ES&page=1`
  );
  const topRatedMovies = useFetch(
    `${URL_API}/movie/top_rated?api_key=${API}&language=es-ES&page=1`
  );

  return (
    <>
      <SliderMovies movies={newMovies} />
      <Row>
        <Col xs={24} md={12} >
          <MovieList title="Películas Populares" movies={popularMovies} />
        </Col>
        <Col xs={24} md={12}>
          <MovieList
            title="Top Mejores Películas Puntuadas"
            movies={topRatedMovies}
          />
        </Col>
      </Row>
      <Footer />
    </>
  );
}

export default Home

