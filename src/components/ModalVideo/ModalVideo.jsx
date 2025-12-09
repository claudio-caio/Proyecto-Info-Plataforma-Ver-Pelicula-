import React from "react";

const ModalVideo = ({
  videoKey,
  videoPlatform,
  isOpen,
  setIsVisibleModal,
}) => {
  if (!isOpen || !videoKey) return null;

  // URL según plataforma
  const urlVideo =
    videoPlatform === "YouTube"
      ? `https://www.youtube.com/embed/${videoKey}`
      : videoPlatform === "Vimeo"
      ? `https://player.vimeo.com/video/${videoKey}`
      : null;

  const handleClose = () => {
    if (typeof setIsVisibleModal === "function") {
      setIsVisibleModal(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-50 
        flex items-center justify-center 
        bg-black/80 backdrop-blur-sm
        animate-fadeIn
      "
      onClick={handleClose}
    >
      {/* Modal */}
      <div
        className="
          relative 
          w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] 
          max-w-4xl
          bg-black rounded-lg shadow-lg
          p-3 sm:p-4
          animate-scaleIn
        "
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Botón de cierre */}
        <button
          onClick={handleClose}
          className="
            absolute top-2 right-3 
            text-white text-3xl font-bold
            hover:text-red-500 transition
          "
        >
          &times;
        </button>

        {/* Video */}
        <div className="w-full aspect-video rounded-md overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={urlVideo}
            title="Video"
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

