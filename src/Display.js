import { useEffect } from 'react';
import { MAP_MODE, ABLY_API_KEY } from './config.js';

import Ably from 'ably';

import ProportionalSymbolMap from './Displays/ProportionalSymbolMap';

function Display() {
  useEffect(() => {
    const ably = new Ably.Realtime(ABLY_API_KEY);
    const channel = ably.channels.get('map');

    console.log('connected to Ably', channel);

    channel.subscribe('update', (message) => {
      console.log('message', message);
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
        <ProportionalSymbolMap />
      )}
    </div>
  );
}

export default Display;
