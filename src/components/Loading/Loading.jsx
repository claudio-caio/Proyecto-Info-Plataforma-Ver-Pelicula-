import React from "react";
import { Spin } from "antd";

const Loading = () => {
  return (
    // Contenedor centrado, tip funciona correctamente
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
        width: "100%",
      }}
    >
      <Spin size="large" tip="Cargando...">
        <div style={{ width: 0, height: 0 }} />
      </Spin>
    </div>
  );
};

export default Loading;

