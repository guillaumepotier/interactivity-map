import React from "react";
import GeoButton from "./Answer/GeoButton";

import Input from "./Answer/Input";

const Answer = () => {
  return (
    <div style={{ height: "100%" }} className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="mb-2">Enter here your location or geolocalize yourself</h1>
      <div className="">
        <Input />
        <GeoButton />
      </div>
    </div>
  );
};

export default Answer;
