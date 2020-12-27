import React from 'react';
import { Props } from './types';
import { VList } from '../../components/v-list';
import { useEvents } from './hooks';
import { OrderTable } from './components/order-table';
import { OrderDetails, OrderLegend } from './components/order-details';
import { Loader } from '../../components/loader';
import { Notification } from '../../components/notification/component';
import { ORDER_LOAD_ERROR_TEXT } from '../../config';

export const StatusPage = ({ core }: Props) => {
  const {
    orderData, isLoading, orderDataLen, isFailed,
  } = useEvents(core);

  return (
    <>
      {isFailed && <Notification text={ORDER_LOAD_ERROR_TEXT} type="danger" />}
      <OrderTable height="full">
        <OrderTable.Header>
          <OrderLegend />
        </OrderTable.Header>
        <OrderTable.Body>
          { (height) => (isLoading ? <Loader /> : (
            <VList
              count={orderDataLen}
              rowHeight={30}
              prerenderCount={5}
              height={height}
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
          )) }
        </OrderTable.Body>
      </OrderTable>
    </>
  );
};
