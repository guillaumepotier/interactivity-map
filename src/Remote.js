import { useState, useEffect } from "react";
import { channel } from "./realtime";

function Remote() {
  const [projection, setProjection] = useState();
  const [scale, setScale] = useState(100);

  const onProjectionChange = (key, value) => {
    console.log('projection', value);
    setProjection({ ...projection, [key]: value });
  };

  useEffect(() => {
    channel.publish('projection', projection);
  }, [projection]);

  return (
    <div className="Remote">
      <div>
        <h2>Display</h2>
        <button onClick={() => onProjectionChange("mode", "geoMercator")}>geoMercator</button>
        <button onClick={() => onProjectionChange("mode", "geoOrthographic")}>geoOrthographic</button>
      </div>

      <div>
        <h2>Rotation</h2>
        <button onClick={() => onProjectionChange("rotation", "fixed")}>fixed</button>
        <button onClick={() => onProjectionChange("rotation", "rotate")}>rotate</button>
        <button onClick={() => onProjectionChange("rotation", "centered")}>centered</button>
      </div>

      <div>
        <h2>Scale</h2>
        <input type="number" defaultValue="1200" onChange={(e) => {
          setScale(e.target.value);
        }}/>
        <button onClick={() => onProjectionChange("scale", scale)}>sync</button>
      </div>

      <div>
        <h2>Country</h2>
        <button onClick={() => channel.publish('country', 'world')}>world</button>
        <button onClick={() => channel.publish('country', 'france')}>france</button>
      </div>
    </div>
  );
}

export default Remote;
