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
  const [country, setCountry] = useState('world');

  useEffect(() => {
    document.getElementById('root').style.backgroundColor = '#006994';

    channel.subscribe('update', (message) => {
      const { city, lat, lng } = message.data;

      if (!lng || !lat || !city) return;

      const city_code = city.toLowerCase().replace(/ /g, '-');

      if (!citiesMap[city_code]) citiesMap[city_code] = { city, city_code, lng, lat, count: 0 };
      citiesMap[city_code].count += 1;

      const clonedData = { ...citiesMap };

      setData(clonedData);
    });

    channel.subscribe('projection', (message) => {
      setProjection({ ...projection, ...message.data });
    });

    channel.subscribe('country', (message) => {
      setCountry(message.data);
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div style={{
      display: "block",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div className="Display" style={{
        display: "flex",
        backgroundColor: '#006994',
      }}>
        {MAP_MODE === 'country' && (
          <div>country</div>
        )}

        {MAP_MODE === 'city' && (
          <ProportionalSymbolMap country={country} projection={projection} data={Object.values(data)} />
        )}
      </div>
    </div>
  );
}

export default Display;
