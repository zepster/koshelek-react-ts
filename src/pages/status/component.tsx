import React, { useEffect, useState } from 'react';
import { Props } from './types';

export const StatusPage = ({ core }: Props) => {
  const [data, setData] = useState<{}[]>();

  useEffect(() => {
    core.plugins.binanceSdk.subscribeDiff(
      'bnbbtc',
      (diff) => core.plugins.eventBus.emit('diffEvent', diff),
    );
  }, [core]);

  useEffect(() => {
    core.plugins.binanceSdk.loadOrders('BNBBTC').then(setData);
  }, [core]);

  return (
    <div>
      <h1>Status Page</h1>
      {JSON.stringify(data, null, 2)}
    </div>
  );
};
