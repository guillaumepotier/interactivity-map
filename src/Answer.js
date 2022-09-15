import React from "react";

import Input from "./Answer/Input";

const Answer = () => {
  return (
    <div className="Answer">
      <h1>Enter here your location or geolalize yourself</h1>

      <div className="root">
        <Input />
      </div>
    </div>
  );
};

export default Answer;
