import React, { useEffect, useState, useMemo } from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const MAPS = {
  world: "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json",
  france: "https://france-geojson.gregoiredavid.fr/repo/regions.geojson",
};

const rot = [-25, -25, -10];

function ProportionalSymbolMap({ data, projection, country }) {
  const [rotate, setRotate] = useState(rot);

  // const [data, setData] = useState([]);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    if (!data.length) return;
    setMaxValue(data[0].count);
  }, [data]);

  useEffect(() => {
    if (window.timeInterval) clearInterval(window.timeInterval);

    if (projection?.rotation === "fixed" || projection?.rotation === "centered") return;

    window.timeInterval = setInterval(() => {
      rot[0] -= 1;
      setRotate([...rot]);
    }, 10);

  }, [projection?.rotation]);

  const popScale = useMemo(
    () => {
      return scaleLinear().domain([0, maxValue]).range([0, 12])
    },
    [maxValue]
  );

  const projectionConfig = {};

  if (projection?.mode === "geoOrthographic")
    projectionConfig.rotate = rotate;

  if (projection.scale)
    projectionConfig.scale = projection.scale;

  if (country === "france") {
    projectionConfig.center = [2.213749, 46.227638];
    projection.scale = 2000;
  }

  if (country === "world") {
    projectionConfig.center = [0, 20];
    projection.scale = 100;
  }

  return (
    // <ComposableMap projectionConfig={{ rotate: [-10, 0, 0] }}>
    <ComposableMap projection={projection.mode} projectionConfig={projectionConfig}>
      <Geographies
        geography={MAPS[country]}
        stroke="#000"
      >
        {({ geographies }) =>
          geographies.map((geo) => {
            return <Geography key={geo.rsmKey} geography={geo} fill="#DDD" />
          })
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
