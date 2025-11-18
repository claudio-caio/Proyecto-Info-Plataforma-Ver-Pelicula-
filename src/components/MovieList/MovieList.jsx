import React from "react";
import { List, Avatar, Button } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Loading } from "..";

const MovieList = ({ title, movies }) => {
  // movies puede venir como: { loading, result } (antiguo useFetch)
  // o directamente como data de react-query (movieList)
  const isLoading = movies?.loading || movies?.isLoading;
  const data = movies?.result?.results ? movies.result : movies;

  if (isLoading || !data || !data.results) return <Loading />;

  return (
    <div className="px-6 py-8 mt-16">
      {/* Lista de películas */}
      <List
        header={<h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg" >{title}</h2>}
        className="movie-list"
        itemLayout="horizontal"
        dataSource={data.results.slice(0, 10)}
        renderItem={(movie) => <RenderMovie movie={movie} />}
      />
    </div>
  );
};

const RenderMovie = ({ movie: { id, title, poster_path } }) => {
  const posterPath = `https://image.tmdb.org/t/p/original${poster_path}`;

  return (
    <List.Item
      className="flex items-center justify-between bg-[#1f1f1f] hover:bg-[#222] transition-colors duration-300 px-6 py-3 rounded-md mb-3"
      style={{padding: "10px"}}
    >
      <div className="flex items-center gap-6">
        <Avatar
          src={posterPath}
          size={64}
          className="rounded-sm shadow-md"
        />
        <Link
          to={`/movie/${id}`}
          className="text-white font-medium text-lg hover:text-[#E50914] transition-colors duration-300"
        >
          <h2 style={{color: "white"}}>
            {title}
          </h2>
        </Link>
      </div>

      <Link to={`/movie/${id}`}>
        <Button
          
          type="primary"
          shape="circle"
          icon={<CaretRightOutlined />}
          className="bg-[#E50914]! border-none! hover:bg-[#B20710]!"
        />
      </Link>
    </List.Item>
  );
};

export default MovieList;

