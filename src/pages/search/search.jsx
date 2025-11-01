import React, { useState, useEffect } from "react";
import { Row, Col, Input} from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import MovieCatalog from "../../components/MovieCatalog";
import Footer from "../../components/Footer";
import { URL_API, API } from "../../utils/contants";
import Pagination from "../../components/Pagination";

import{useForm} from '../../hooks/useForm'

import "./search.scss";

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);

  const { q } = queryString.parse(location.search)

  const [ formValues, handleInputChange,setValues ] = useForm({
    searchValue2:  q
  });
  const { searchValue2 } = formValues;


  useEffect(() => {

    
    (async () => {
      if(searchValue2){
        const response = await fetch(
          `${URL_API}/search/movie?api_key=${API}&language=es-ES&query=${searchValue2}&page=${page}`
        );  
        const movies = await response.json();

        setValues({searchValue2}); 
        // setSearchValue(searchValue2);
        setMovieList(movies);

      }
      
               
    })();  
// esto se coloco para evitar el warning por searchValue2
// eslint-disable-next-line react-hooks/exhaustive-deps   
  }, [location.search,page]);

  const onChangeSerach = e => {
    e.preventDefault();
    navigate(`?q=${searchValue2}`);
    setValues({searchValue2}); 
  };

  const onChangePage = page => {
    setPage(page);
  };




  return (
    <>
      <Row className=" d-flex justify-content-center">

        <Col span={12} className="search">
        
            <h1>Busca tu Película</h1>
            <form onSubmit={ onChangeSerach } >
              <Input value={searchValue2} autoComplete="off" name="searchValue2" onChange={handleInputChange} placeholder="Nombre de Película"/>
              <button
                  type="submit"
                  className="btn mt-3 btn-block btn-outline-primary d-grid gap-2 col-6 mx-auto  "
              >
                  Buscar...
              </button>
            </form>
        </Col>

      </Row>
      {movieList.results && (
        <Row>
          <Row span={24}  style={{ width: "100%"}} >
            <MovieCatalog movies={movieList} />
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
      <Row>
        <Col span={24}>
          <Footer />
        </Col>
      </Row>
    </>
  );
}

export default Search;
