import React from "react";
import MovieCard from "./MovieCard";

const MovieCatalog = ({ movies: { results = [] } = {}, favorites = [], onToggleFavorite, isAuthenticated = false }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full">
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
  );
};

export default MovieCatalog;

