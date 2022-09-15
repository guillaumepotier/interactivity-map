import React from "react";
import GeoButton from "./Answer/GeoButton";

import Input from "./Answer/Input";

const Answer = () => {
  return (
    <div className="Answer">
      <h1>Enter here your location or geolalize yourself</h1>

      <div className="root">
        <Input />
        <GeoButton />
      </div>
    </div>
  );
};

export default Answer;
