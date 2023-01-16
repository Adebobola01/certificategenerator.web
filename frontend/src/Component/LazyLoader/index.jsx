import React from "react";
import { Loader } from "../index";
const LazyLoader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Loader />
    </div>
  );
};

export default LazyLoader;
