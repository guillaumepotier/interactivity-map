import { useEffect, useState } from 'react';
import {
  MAP_MODE,
} from './config.js';
import { channel } from "./realtime";
import ProportionalSymbolMap from './Displays/ProportionalSymbolMap';

const citiesMap = {};

const PROJECTION = {
  mode: "geoMercator",
  config: {},
  rotation: "centered",
};

function Display() {
  const [projection, setProjection] = useState(PROJECTION);
  const [data, setData] = useState([]);
  const cities = Object.values(data);

  // console.log('data', data);
  // console.log('cities', cities);

  useEffect(() => {
    channel.subscribe('update', (message) => {
      const { city, lat, lng } = message.data;

      console.log('received update', city, lat, lng);

      if (!lng || !lat || !city) return;

      const city_code = city.toLowerCase().replace(/ /g, '-');

      if (!citiesMap[city_code]) citiesMap[city_code] = { city, city_code, lng, lat, count: 0 };
      citiesMap[city_code].count += 1;

      console.log('citiesMap', citiesMap);
      const clonedData = { ...citiesMap };

      setData(clonedData);
    });

    channel.subscribe('projection', (message) => {
      console.log('received projection', message.data);
      setProjection({ ...projection, ...message.data });
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="Display">
      {MAP_MODE === 'country' && (
        <div>country</div>
      )}

      {MAP_MODE === 'city' && (
        <ProportionalSymbolMap projection={projection} data={Object.values(data)} />
      )}
    </div>
  );
}

export default Display;
