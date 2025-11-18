import React, { useRef } from "react";
import Movie from "./Movie";
import { Loading } from "../index";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const SliderMovies = ({ movies }) => {
  const carouselRef = useRef();

  const isLoading = movies?.loading || movies?.isLoading;

  const results =
    movies?.result?.results ||
    movies?.data?.results ||
    movies?.results ||
    null;

  if (isLoading || !results) return <Loading />;

  const next = () => carouselRef.current.next();
  const prev = () => carouselRef.current.prev();

  return (
    <div className="relative w-full group">

      {/* Flecha Izquierda */}
      <button
        onClick={prev}
        className="
          absolute left-2 top-1/2 -translate-y-1/2 z-20
          w-12 h-12 rounded-full
          bg-black/50 text-white flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          hover:bg-black/70
        "
      >
        <LeftOutlined className="text-xl" />
      </button>

      {/* Carrusel */}
      <Carousel ref={carouselRef} dots={false} autoplay>
        {results.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </Carousel>

      {/* Flecha Derecha */}
      <button
        onClick={next}
        className="
          absolute right-2 top-1/2 -translate-y-1/2 z-20
          w-12 h-12 rounded-full
          bg-black/50 text-white flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          hover:bg-black/70
        "
      >
        <RightOutlined className="text-xl" />
      </button>
    </div>
  );
};

export default SliderMovies;
