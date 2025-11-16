import { List, Avatar, Button } from "antd";
import { CaretRightOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

import "./MovieList.scss";



const RenderMovie = (props) => {
  const {
    movie: { id, title, poster_path }
  } = props;
  const posterPath = `https://image.tmdb.org/t/p/original${poster_path}`;

  return (
    <List.Item className="movie-list__movie">
      <List.Item.Meta
        avatar={<Avatar src={posterPath} />}
        title={<Link to={`/movie/${id}`}>{title}</Link>}
      />
      <Link to={`/movie/${id}`}>
        <Button type="primary" shape="cirlce" icon= {<CaretRightOutlined />} />
      </Link>
    </List.Item>
  );
}

export default RenderMovie

