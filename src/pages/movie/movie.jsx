import React, { useState} from "react";
import { Row, Col, Button } from "antd";
import { RightCircleOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import moment from "moment";
import useFetch from "../../hooks/useFetch";
import { URL_API, API } from "../../utils/contants";
import Loading from "../../components/Loading";
import ModalVideos from "../../components/ModalVideo";


import "./movie.scss";

export default function Movie() {
  const { id } = useParams();
  const movieInfo = useFetch(
    `${URL_API}/movie/${id}?api_key=${API}&language=es-ES`
  );

  if (movieInfo.loading || !movieInfo.result) {
    return <Loading />;
  }

  return <RenderMovie movieInfo={movieInfo.result} />;
}

function RenderMovie(props) {
  const {
    movieInfo: { backdrop_path, poster_path }
  } = props;
  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;
  

  return (
    <Row
      className="movie"
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      <div className="movie__dark" />
        <Row>
          <Col xs={12} md={9} offset={3} className="movie__poster orden1">
            <PosterMovie image={poster_path} />
          </Col>
          <Col xs={24} md={10} className="movie__info orden2">
            <MovieInfo movieInfo={props.movieInfo} />
          </Col>
        </Row>
    </Row>
  );
}

function PosterMovie(props) {
  const { image } = props;
  const posterPath = `https://image.tmdb.org/t/p/original${image}`;

  return <div style={{ backgroundImage: `url('${posterPath}')` }} />;
}

function MovieInfo(props) {
  const {
    movieInfo: { id, title, release_date, overview, genres }
  } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const videoMovie = useFetch(
    `${URL_API}/movie/${id}/videos?api_key=${API}&language=es-ES`
  );

  // Se hizo para realizar un juego de activar y desactivas el modal con el video
  const [estado, setEstado] = useState(false);
  // 
  const openModal = () => {
  setIsVisibleModal(true);

  //Se hizo para realizar un juego de activar y desactivas el modal con el video 
  setEstado(!isVisibleModal);
  // 
}

  // const closeModal = () => setIsVisibleModal(false)

  const renderVideo = () => {
    
    if (videoMovie.result) {
      if (videoMovie.result.results.length > 0) {
        return (
          <>
            <Button icon={<RightCircleOutlined />} onClick={openModal} className="d-flex align-items-center">
              Ver trailer
            </Button>
            <ModalVideos
              
              videoKey={videoMovie.result.results[0].key}
              videoPlatform={videoMovie.result.results[0].site}
              setIsVisibleModal={setIsVisibleModal}
              isOpen={isVisibleModal}
              setEstado={setEstado}
              estado={estado}
            />
          </>
        );
      }
    }
  };
  
  return (
    <>
      <div className="movie__info-header">
        <h1 style={{fontSize:"4vw"}}>
          {title}
          <span>{moment(release_date, "YYYY-MM-DD").format("YYYY")}</span>
        </h1>
        
      </div>
      <div className="movie__info-content">
        <h3 style={{fontSize:"20px"}}>General</h3>
        <p>{overview}</p>

        <h3 style={{fontSize:"20px"}}>Generos</h3>
        <ul>
          {genres.map(gender => (
            <li key={gender.id}>{gender.name}</li>
          ))}
        </ul>
      </div>
      <div className="movie__info-trailer">
        {renderVideo()}
        </div>
      
    </>
  );
}
