import React, { useState } from "react";
import { Button } from "antd";
import moment from "moment";
import { RightCircleOutlined } from "@ant-design/icons";
import useFetch from "../../hooks/useFetch";
import { URL_API, API } from "../../utils/contants";
import ModalVideos from "../../components/ModalVideo/ModalVideo";

const MovieInfo = ({ movieInfo }) => {
  const { id, title, release_date, overview, genres } = movieInfo;

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [estado, setEstado] = useState(false);

  const videoMovie = useFetch(
    `${URL_API}/movie/${id}/videos?api_key=${API}&language=es-ES`
  );

  const openModal = () => {
    setIsVisibleModal(true);
    setEstado(!isVisibleModal);
  };

  const renderVideo = () => {
    if (!videoMovie.result) return null;

    if (videoMovie.result.results.length > 0) {
      const { key, site } = videoMovie.result.results[0];

      return (
        <>
          <Button
            icon={<RightCircleOutlined />}
            onClick={openModal}
            className="d-flex align-items-center"
          >
            Ver trailer
          </Button>

          <ModalVideos
            videoKey={key}
            videoPlatform={site}
            setIsVisibleModal={setIsVisibleModal}
            isOpen={isVisibleModal}
            setEstado={setEstado}
            estado={estado}
          />
        </>
      );
    }
  };

  return (
    <>
      <div className="movie__info-header">
        <h1 style={{ fontSize: "4vw" }}>
          {title}
          <span>{moment(release_date, "YYYY-MM-DD").format("YYYY")}</span>
        </h1>
      </div>

      <div className="movie__info-content">
        <h3 style={{ fontSize: "20px" }}>General</h3>
        <p>{overview}</p>

        <h3 style={{ fontSize: "20px" }}>Géneros</h3>
        <ul>
          {genres.map((gender) => (
            <li key={gender.id}>{gender.name}</li>
          ))}
        </ul>
      </div>

      <div className="movie__info-trailer">{renderVideo()}</div>
    </>
  );
};

export default MovieInfo;


