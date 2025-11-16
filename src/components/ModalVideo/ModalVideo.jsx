import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import ReactPlayer from "react-player";

import "./ModalVideo.scss";

const ModalVideo = (props) => {
  const { videoKey, videoPlatform, setIsVisibleModal, isOpen, setEstado, estado } = props;
  const [urlVideo, setUrlVideo] = useState("");

  console.log("traile", videoKey);

  const handelClosed = () => {
    setEstado(false);
    setTimeout(() => {
      setIsVisibleModal(false);
      setUrlVideo(""); // Clean URL on close
    }, 300);
  };

useEffect(() => {
  if (!videoKey) return;

  switch (videoPlatform) {
    case "YouTube":
      // ReactPlayer necesita formato embed
      setUrlVideo(`https://www.youtube.com/embed/${videoKey}`);
      break;

    case "Vimeo":
      // Vimeo también usa player embed
      setUrlVideo(`https://player.vimeo.com/video/${videoKey}`);
      break;

    default:
      break;
  }
}, [videoKey, videoPlatform]);



  return (
    <Modal
      className="modal-video"
      open={isOpen}
      centered
      onCancel={handelClosed}
      footer={false}
      width={800}
    >
      {urlVideo && (
        <ReactPlayer
          url={urlVideo}
          controls
          playing={estado}
          width="100%"
          height="450px"
        />
      )}
    </Modal>
  );
};

export default ModalVideo;


