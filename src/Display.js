import { useEffect, useState } from 'react';
import {
  MAP_MODE,
  ABLY_API_KEY,
  ABLY_ROOM
} from './config.js';
import Ably from 'ably';

import ProportionalSymbolMap from './Displays/ProportionalSymbolMap';

const citiesMap = {};

function Display() {
  const [data, setData] = useState([]);
  const cities = Object.values(data);

  console.log('data', data);
  console.log('cities', cities);

  // city data fixtures
  // useEffect(() => {
  //   csv("/data.csv").then((cities) => {
  //     console.log('cities', cities);
  //     const sortedCities = cities.sort((o) => -o.population);
  //     setData(sortedCities);
  //   });
  // }, []);

  useEffect(() => {
    const ably = new Ably.Realtime(ABLY_API_KEY);
    const channel = ably.channels.get(ABLY_ROOM);

    window.channel = channel;

    console.log('connected to Ably', channel);

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
        <ProportionalSymbolMap data={Object.values(data)} />
      )}
    </div>
  );
}

export default Display;
