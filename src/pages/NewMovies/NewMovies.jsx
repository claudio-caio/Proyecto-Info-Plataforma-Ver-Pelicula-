import React, { useState, useContext } from "react";
//components
import { Loading, MovieCatalog, Pagination} from "../../components/index";
import { useNowPlaying, useFavorites, useAddFavorite, useRemoveFavorite } from "../../hooks/useMovies";
import { AuthContext } from "../../context/auth";


const NewMovies = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [page, setPage] = useState(1);

  const { data: movieList, isLoading } = useNowPlaying(page);

  const { data: favorites = [] } = useFavorites();
  const addFav = useAddFavorite();
  const removeFav = useRemoveFavorite();

  const onChangePage = (page) => setPage(page);

  const handleToggleFavorite = (movie) => {
    const exists = favorites.some((f) => f.id === movie.id);
    if (exists) removeFav.mutate(movie.id);
    else addFav.mutate(movie);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white px-6 py-6 ">
      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 drop-shadow-lg  py-20 ">
        Últimos lanzamientos
      </h1>

      {/* Contenido */}
      {isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : movieList?.results ? (
        <div className="flex flex-col items-center gap-8">
          {/* MovieCatalog */}
          <MovieCatalog movies={movieList} favorites={favorites} onToggleFavorite={handleToggleFavorite} isAuthenticated={isAuthenticated} />

          {/* Paginación */}
          <Pagination
            currentPage={movieList.page}
            totalItems={movieList.total_results}
            onChangePage={onChangePage}
          />
        </div>
      ) : (
        <div className="flex justify-center text-white">No hay resultados</div>
      )}

      
    
    </div>
  );
};

export default NewMovies;
