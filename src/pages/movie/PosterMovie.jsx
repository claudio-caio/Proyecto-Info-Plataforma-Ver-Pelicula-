import React from "react";

const PosterMovie = ({ image }) => {
  const posterPath = `https://image.tmdb.org/t/p/original${image}`;

  return <div style={{ backgroundImage: `url('${posterPath}')` }} />;
};

export default PosterMovie;
