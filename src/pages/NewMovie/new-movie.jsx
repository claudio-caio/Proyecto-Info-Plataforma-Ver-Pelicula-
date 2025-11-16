import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { URL_API, API } from "../../utils/contants";

// Components
import { Loading, MovieCatalog, Pagination, Footer } from "../../components";

const NewMovies = () => {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${URL_API}/movie/now_playing?api_key=${API}&lenguage=es-ES&page=${page}`
      );
      const movies = await response.json();
      setMovieList(movies);
    })();
  }, [page]);

  const onChangePage = (page) => {
    setPage(page);
  };

  return (
    <>
      <Row>
        <Col span={24} style={{ textAlign: "center", marginTop: 25 }}>
          <h1 style={{ fontSize: 35, fontWeight: "bold" }}>
            Últimos lanzamientos
          </h1>
        </Col>
      </Row>

      {movieList.results ? (
        <Row>
          <Row span="24" style={{ justifyContent: "center" }}>
            <MovieCatalog movies={movieList} />
          </Row>

          <Col span={24}>
            <Pagination
              currentPage={movieList.page}
              totalItems={movieList.total_results}
              onChangePage={onChangePage}
            />
          </Col>
        </Row>
      ) : (
        <Col span={24}>
          <Loading />
        </Col>
      )}

      <Row>
        <Col span={24}>
          <Footer />
        </Col>
      </Row>
    </>
  );
};

export default NewMovies;
