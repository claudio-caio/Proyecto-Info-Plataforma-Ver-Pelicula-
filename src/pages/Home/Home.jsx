import React, { useContext } from "react";
import { Row, Col } from "antd";
import {  MovieList, SliderMovies } from "../../components/index";
import { useNowPlaying, usePopularMovies, useTopRated, useFavorites, useAddFavorite, useRemoveFavorite } from "../../hooks/useMovies";
import { AuthContext } from "../../context/auth";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { data: newMovies } = useNowPlaying(1);
  const { data: popularMovies } = usePopularMovies(1);
  const { data: topRatedMovies } = useTopRated(1);

  const { data: favorites = [] } = useFavorites();
  const addFav = useAddFavorite();
  const removeFav = useRemoveFavorite();

  const handleToggleFavorite = (movie) => {
    const exists = favorites.some((f) => f.id === movie.id);
    if (exists) removeFav.mutate(movie.id);
    else addFav.mutate(movie);
  };

  return (
    <>
      <SliderMovies movies={newMovies} isAuthenticated={isAuthenticated} />

      <Row>
        <Col xs={24} md={12}>
          <MovieList title="Películas Populares" movies={popularMovies} favorites={favorites} onToggleFavorite={handleToggleFavorite} isAuthenticated={isAuthenticated} />
        </Col>

        <Col xs={24} md={12}>
          <MovieList
            title="Top Mejores Películas Puntuadas"
            movies={topRatedMovies}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            isAuthenticated={isAuthenticated}
          />
        </Col>
      </Row>
    </>
  );
};

export default Home;
