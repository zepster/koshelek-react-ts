import React, { useEffect, useMemo, useState } from 'react';
import { Orders, OrderUpdatePayload, Props } from './types';
import { DEFAULT_SYMBOL, ORDER_UPDATE, SYMBOL_UPDATE } from '../../config';

const defaultState: Orders = {
  lastUpdateId: 3213,
  bids: [],
  asks: [],
};

export const StatusPage = ({ core }: Props) => {
  const [orderData, setOrderData] = useState<Orders>(defaultState);
  const symbol = useMemo<string>(() => {
    const lastSymbol = core.plugins.eventBus.last(SYMBOL_UPDATE) as string;

    return lastSymbol || DEFAULT_SYMBOL;
  }, [core]);

  const lastOrderData = useMemo<OrderUpdatePayload | undefined>(
    () => core.plugins.eventBus.last(ORDER_UPDATE) as OrderUpdatePayload,
    [core],
  );

  useEffect(() => {
    if (lastOrderData?.symbol === symbol) {
      setOrderData(lastOrderData.data);
    } else {
      core.plugins.binanceSdk.loadOrders(symbol)
        .then((data: Orders) => {
          core.plugins.eventBus.emit(ORDER_UPDATE, { symbol, data });
          setOrderData(data);
        });
    }
  }, [symbol, lastOrderData, core]);

  return (
    <div>
      <h1>
        Status Page:
        {symbol}
      </h1>
      {
        orderData.asks.map((ask) => (
          <div key={ask.join('-')}>{ask.join(' - ')}</div>
        ))
      }
    </div>
  );
};
