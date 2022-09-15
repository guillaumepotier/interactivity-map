import React, { useEffect, useState, useMemo } from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";

// WORLD GEOJSON
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// FRANCE GEOJSON
// const geoUrl = "https://france-geojson.gregoiredavid.fr/repo/regions.geojson";

const rot = [-25, -25, -10];

function ProportionalSymbolMap({ data, projection }) {
  const [rotate, setRotate] = useState(rot);

  console.log('>> projection', projection);

  // const [data, setData] = useState([]);
  const [maxValue, setMaxValue] = useState(0);
  console.log('maxValue', maxValue);

  useEffect(() => {
    if (!data.length) return;
    setMaxValue(data[0].count);
  }, [data]);

  useEffect(() => {
    console.log('rotation changed', projection?.rotation);

    if (window.timeInterval) clearInterval(window.timeInterval);

    if (projection?.rotation === "fixed" || projection?.rotation === "centered") return;

    window.timeInterval = setInterval(() => {
      rot[0] -= 1;
      setRotate([...rot]);
    }, 10);

  }, [projection?.rotation]);

  const popScale = useMemo(
    () => {
      console.log('popScale', scaleLinear().domain([0, maxValue]).range([0, 5]));
      return scaleLinear().domain([0, maxValue]).range([0, 5])
    },
    [maxValue]
  );

  const projectionConfig = {};

  if (projection?.mode === "geoOrthographic")
    projectionConfig.rotate = rotate;

  if (projection.scale)
    projectionConfig.scale = projection.scale;

  return (
    // <ComposableMap projectionConfig={{ rotate: [-10, 0, 0] }}>
    <ComposableMap projection={projection.mode} projectionConfig={projectionConfig}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} fill="#DDD" />
          ))
        }
      </Geographies>
      {data.map(({ city_code, lng, lat, count }) => {
        return (
          <Marker key={city_code} coordinates={[lng, lat]} style={{
            default: {
              border: "3px solid yellow",
              dropShadow: "0 0 0 20px black",
              fill: "red",
              stroke: "white",
              opacity: 0.5,
            },
            hover: {
              fill: "red",
              stroke: "white",
            },
          }}>
            <circle r={popScale(count)} />
          </Marker>
        );
      })}
    </ComposableMap>
  );

}

export default ProportionalSymbolMap;
