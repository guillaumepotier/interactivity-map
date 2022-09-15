import React, { useEffect, useState, useMemo } from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { csv } from "d3-fetch";

// const PROJECTION = {
//   mode: "geoOrthographic",
//   config: {
//     rotate: [-15, -25, 10],
//   },
// };

const PROJECTION = {
  mode: "geoMercator",
  config: {},
};

// WORLD GEOJSON
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// FRANCE GEOJSON
// const geoUrl = "https://france-geojson.gregoiredavid.fr/repo/regions.geojson";

function ProportionalSymbolMap() {

  const [data, setData] = useState([]);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    csv("/data.csv").then((cities) => {
      console.log('cities', cities);
      const sortedCities = cities.sort((o) => -o.population);

      setMaxValue(sortedCities[0].population);
      setData(sortedCities);
    });
  }, []);

  const popScale = useMemo(
    () => scaleLinear().domain([0, maxValue]).range([0, 12]),
    [maxValue]
  );

  return (
    // <ComposableMap projectionConfig={{ rotate: [-10, 0, 0] }}>
    <ComposableMap projection={PROJECTION.mode} projectionConfig={PROJECTION.config}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} fill="#DDD" />
          ))
        }
      </Geographies>
      {data.map(({ city_code, lng, lat, population }) => {
        // console.log(city_code, lng, lat, population);

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
            <circle r={popScale(population)} />
          </Marker>
        );
      })}
    </ComposableMap>
  );

}

export default ProportionalSymbolMap;
