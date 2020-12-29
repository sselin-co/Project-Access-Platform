import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div>
      <ReactLoading type="cylon" color="#2d2d2d" />
      Loading...
    </div>
  );
}
