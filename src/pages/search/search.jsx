import React, { useState, useEffect } from "react";
import { Col, Input, Alert, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

// components
import { MovieCatalog,  Pagination, Loading } from "../../components/index";
import { useSearchMovies, useFavorites, useAddFavorite, useRemoveFavorite } from "../../hooks/useMovies";
import { useForm } from "../../hooks/useForm";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { q } = queryString.parse(location.search);

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(q || ""); // solo dispara la búsqueda

  const [formValues, handleInputChange, setValues] = useForm({
    searchValue2: q || "",
  });
  const { searchValue2 } = formValues;

  // sincronizar input con URL al cargar
  useEffect(() => {
    setValues({ searchValue2: q || "" });
    // defer updating searchQuery and page to avoid synchronous setState inside the effect
    const timeoutId = setTimeout(() => {
      setSearchQuery(q || "");
      setPage(1);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [q, setValues ]);

  // Hook solo usa searchQuery, no el input directamente
  const { data: movieList, isLoading, isError, error, refetch } = useSearchMovies(searchQuery, page);

  // Favoritos
  const { data: favorites = [] } = useFavorites();
  const addFav = useAddFavorite();
  const removeFav = useRemoveFavorite();

  const onChangeSearch = (e) => {
    e.preventDefault();
    navigate(`?q=${searchValue2}`);
    setSearchQuery(searchValue2); // ahora la búsqueda se dispara solo al submit
    setPage(1);
  };

  const onChangePage = (newPage) => setPage(newPage);

  const handleToggleFavorite = (movie) => {
    const exists = favorites.some((f) => f.id === movie.id);
    if (exists) removeFav.mutate(movie.id);
    else addFav.mutate(movie);
  };

  return (
    <div className="bg-[#141414] min-h-screen text-white flex flex-col">
      {isLoading ? (
        <div className="flex-grow flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center mb-4 py-10">
          <Col xs={24} sm={20} md={16} lg={12} className="px-4">
            <h1 className="text-3xl font-bold text-center mb-6">
              Busca tu Película
            </h1>
            <form
              onSubmit={onChangeSearch}
              className="flex flex-col items-center gap-4"
            >
              <Input
                value={searchValue2}
                autoComplete="off"
                name="searchValue2"
                onChange={handleInputChange}
                placeholder="Nombre de Película"
                className="w-full max-w-md rounded-md border-none shadow-lg"
              />
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "rgb(220, 38, 38)",            
                  color: "white",                                 
                  fontWeight: "bold",                             
                  paddingTop: "0.5rem",                           
                  paddingBottom: "0.5rem",
                  paddingLeft: "1.5rem",                         
                  paddingRight: "1.5rem",
                  borderRadius: "0.375rem",                       
                  transitionProperty: "background-color",         
                  transitionDuration: "150ms",
                }}

              >
                Buscar
              </Button>
            </form>
          </Col>
        </div>
      )}

      {!isLoading && isError && (
        <div className="px-4 pb-10">
          <Alert
            message="Error"
            description={error?.message}
            type="error"
            showIcon
            action={<Button size="small" onClick={() => refetch()}>Reintentar</Button>}
          />
        </div>
      )}

      {!isLoading && movieList?.results && (
        <div className="px-4 pb-10">
          <MovieCatalog
            movies={movieList}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={movieList.page}
              totalItems={movieList.total_results}
              onChangePage={onChangePage}
            />
          </div>
        </div>
      )}

     
    </div>
  );
};

export default Search;

