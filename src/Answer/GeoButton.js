import React, { useState } from "react";
import { channel } from "../realtime";
import { getCityName } from "./service";

const GeoButton = () => {
  const [localize, setLocalize] = useState(false);
  const getPosition = () => {
    return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
  };

  const handleGeolocalize = async () => {
    try {
      const { coords } = await getPosition();
      const { latitude, longitude } = coords;

      const res = await getCityName(longitude, latitude);
      channel.publish("update", { lng: longitude, lat: latitude, city: res.features[0].place_name });
      setLocalize(true);
    } catch (err) {}
  };

  return (
    <div className="d-flex flex-column">
      <button type="button" className="btn btn-primary mb-5" onClick={handleGeolocalize}>
        Geolocalize me
      </button>

      {localize && (
        <div style={{ position: "fixed", bottom: "5px" }} class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>You are</strong> Geolocalized
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
    </div>
  );
};

export default GeoButton;
