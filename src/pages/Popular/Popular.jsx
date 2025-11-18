import React, { useState } from "react";
import { Row, Col, Alert, Button } from "antd";
import { Loading, MovieCatalog, Pagination} from "../../components/index";
import { usePopularMovies, useFavorites, useAddFavorite, useRemoveFavorite } from "../../hooks/useMovies";


const Popular = () => {
  const [page, setPage] = useState(1);

  const { data: movieList, isLoading, isError, error, refetch } = usePopularMovies(page);

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
    <div className=" px-6">
      <Row >
        <Col span={24} style={{ textAlign: "center", marginTop: 25 }}>
          <h1 style={{ fontSize: 35, fontWeight: "bold", color: 'white', paddingBottom: '80px', paddingTop: '80px'}}>
            Populares
          </h1>
        </Col>
      </Row>

      {isLoading ? (
        <Col span="24">
          <Loading />
        </Col>
      ) : isError ? (
        <Col span={24} className="px-4">
          <Alert
            message="Error al obtener películas"
            description={error?.message || 'Ocurrió un problema al cargar.'}
            type="error"
            showIcon
            action={(
              <Button size="small" type="primary" onClick={() => refetch()}>
                Reintentar
              </Button>
            )}
          />
        </Col>
      ) : movieList?.results?.length === 0 ? (
        <Col span={24} className="text-center text-white mt-8">No hay resultados.</Col>
      ) : (
        <Row>
          <Row span="24" style={{ justifyContent: "center" }}>
            <MovieCatalog movies={movieList} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
          </Row>
          <Col span="24">
            <Pagination
              currentPage={movieList.page}
              totalItems={movieList.total_results}
              onChangePage={onChangePage}
            />
          </Col>
        </Row>
      )}


    </div>
  );
};

export default Popular;
