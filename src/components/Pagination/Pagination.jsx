import React from "react";
import Pagination from "rc-pagination";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./index.css";

const PaginationMovies = ({ currentPage, totalItems, onChangePage }) => {
  return (
    <div className="flex justify-center mt-10">
      <Pagination
        className="netflix-pagination"
        current={currentPage}
        total={totalItems}
        pageSize={2000}
        onChange={onChangePage}
        showSizeChanger={false} 
        /* FLECHAS */
        prevIcon={<LeftOutlined className="text-white text-lg" />}
        nextIcon={<RightOutlined className="text-white text-lg" />}
      />
    </div>
  );
};

export default PaginationMovies;
