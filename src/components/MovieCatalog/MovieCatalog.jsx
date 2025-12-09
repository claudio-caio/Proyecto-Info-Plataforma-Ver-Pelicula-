import React from "react";
import MovieCard from "./MovieCard";

const MovieCatalog = ({
  movies: { results = [] } = {},
  favorites = [],
  onToggleFavorite,
  isAuthenticated = false
}) => {
  return (
    <div className="w-full px-2 sm:px-4 lg:px-6">
      <div
        className="
          grid 
          grid-cols-2
          xs:grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
          gap-4 sm:gap-6
        "
      >
        {results.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favorites.some((f) => f.id === movie.id)}
            onToggleFavorite={onToggleFavorite}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCatalog;


