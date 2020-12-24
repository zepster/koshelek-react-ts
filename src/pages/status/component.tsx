import React, { useEffect, useMemo, useState } from 'react';
import { Orders, OrderUpdatePayload, Props } from './types';
import { DEFAULT_SYMBOL, ORDER_UPDATE, SYMBOL_UPDATE } from '../../config';
import styles from './index.module.css';
import { VList } from '../../components/v-list';

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
      <div className={styles['t-body']}>
        <VList
          count={orderData.asks.length}
          rowHeight={30}
          offset={0}
        >
          {
            ((index) => {
              if (!orderData.asks[index]) {
                // eslint-disable-next-line no-console
                console.log('outside: ', index);
                return null;
              }
              return (
                <div key={index} className={styles['t-row']}>
                  <div>{orderData.asks[index].join(' - ')}</div>
                  &nbsp;
                  |
                  &nbsp;
                  <div>{orderData.bids[index].join(' - ')}</div>
                </div>
              );
            })
          }
        </VList>
      </div>
    </div>
  );
};
