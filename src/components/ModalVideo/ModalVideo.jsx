import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import ReactPlayer from "react-player";

import "./ModalVideo.scss";

export default function ModalVideos(props) {
  const { videoKey, videoPlatform, setIsVisibleModal, isOpen, setEstado, estado } = props;
  const [urlVideo, setUrlVideo] = useState(null)

  //Se hizo para realizar un juego de activar y desactivas el modal con el video 
  const handelClosed = ()=>{
    setEstado(!isOpen)
    setTimeout( () =>  {
      setIsVisibleModal(false)
      }, 500 )   
  }
  // 

  useEffect(() => {
    switch (videoPlatform) {
      case "YouTube":
        setUrlVideo(`https://youtu.be/${videoKey}`);
        break;
      case "Vimeo":
        setUrlVideo(`https://vimeo.com/${videoKey}`);
        break;
      default:
        break;
    }

  }, [videoKey, videoPlatform]);

  return (
  <Modal
      className='modal-video'
      visible={isOpen}
      centered
      onCancel={handelClosed}
      footer={false}
    >
      <ReactPlayer url={urlVideo} controls playing={estado} />
    </Modal>
  );
}
