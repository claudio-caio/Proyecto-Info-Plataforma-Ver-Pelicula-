import React from "react";
import ReactPlayer from "react-player";



const ModalVideo = ({ videoKey, videoPlatform, isOpen, setIsVisibleModal }) => {
  if (!isOpen || !videoKey) return null;

  // Calcula URL según plataforma
  const urlVideo =
  videoPlatform === "YouTube"
    ? `https://www.youtube.com/embed/${videoKey}`
    : videoPlatform === "Vimeo"
    ? `https://vimeo.com/${videoKey}`
    : null;

  if (!urlVideo) return null;
 console.log(urlVideo)
  const handleClose = () => {
    if (typeof setIsVisibleModal === "function") {
      setIsVisibleModal(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative w-full max-w-3xl p-4 bg-gray-900 rounded-lg shadow-lg">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-red-500"
        >
          &times;
        </button>

        <div className="w-full aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
/>
        </div>
      </div>
    </div>
  );
};

export default ModalVideo;


