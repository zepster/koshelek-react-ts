import React from 'react';
import { Props } from './types';
import styles from './index.module.css';
import { VList } from '../../components/v-list';
import { useEvents } from './hooks';

export const StatusPage = ({ core }: Props) => {
  const { isLoading, isSuccess, orderData } = useEvents(core);

  return (
    <div>
      {
        isLoading && 'Loading...'
      }
      { isSuccess && 'Success' }
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
                  &nbsp;
                  |
                  &nbsp;
                  {index}
                </div>
              );
            })
          }
        </VList>
      </div>
    </div>
  );
};
