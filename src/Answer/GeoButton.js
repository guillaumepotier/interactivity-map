import React, { useState } from "react";
import { channel } from "../realtime";
import { getCityName } from "./service";

const GeoButton = () => {
  const getPosition = () => {
    return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
  };

  const handleGeocalize = async () => {
    try {
      const { coords } = await getPosition();
      const { latitude, longitude } = coords;

      const res = await getCityName(longitude, latitude);
      channel.publish("update", { lng: longitude, lat: latitude, city: res.features[0].place_name });
    } catch (err) {}
  };

  return <button onClick={handleGeocalize}>Geolocalize me</button>;
};

export default GeoButton;
