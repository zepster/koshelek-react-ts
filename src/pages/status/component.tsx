import React from 'react';
import { Props } from './types';
import { VList } from '../../components/v-list';
import { useEvents } from './hooks';
import { OrderTable } from './components/order-table';
import { OrderDetails } from './components/order-details';

export const StatusPage = ({ core }: Props) => {
  const { isLoading, isSuccess, orderData } = useEvents(core);

  return (
    <div>
      {
        isLoading && 'Loading...'
      }
      { isSuccess && 'Success' }
      <OrderTable>
        <OrderTable.Header>
          Таблица N1
        </OrderTable.Header>
        <OrderTable.Body>
          <VList
            count={orderData.asks.length}
            rowHeight={30}
            prerenderCount={5}
          >
            {
              ((index) => (
                <OrderTable.Row key={index}>
                  <OrderDetails
                    bids={orderData.bids[index]}
                    asks={orderData.asks[index]}
                  />
                </OrderTable.Row>
              ))
            }
          </VList>
        </OrderTable.Body>
      </OrderTable>
    </div>
  );
};
