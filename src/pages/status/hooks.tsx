import { useEffect, useState } from 'react';
import { OrderUpdatePayload, Props } from './types';
import { ORDER_LOAD_STATUS_CHANGE, ORDER_UPDATE } from '../../config';
import { Orders } from '../../core/plugins/binance-sdk/types';

const defaultState: Orders = {
  lastUpdateId: 3213,
  bids: [],
  asks: [],
};

export const useEvents = (core: Props['core']) => {
  const { eventBus } = core.plugins;
  const [status, setStatus] = useState(eventBus.last(ORDER_LOAD_STATUS_CHANGE) as string || 'init');
  const [orderData, setOrderData] = useState(
    (eventBus.last(ORDER_UPDATE) as OrderUpdatePayload)?.data || defaultState,
  );

  useEffect(() => {
    const subs = [
      eventBus.on(ORDER_UPDATE, (payload) => setOrderData((payload as OrderUpdatePayload).data)),
      eventBus.on(ORDER_LOAD_STATUS_CHANGE, (newStatus) => setStatus(newStatus as string)),
    ];
    return () => {
      subs.forEach((sub) => sub());
    };
  }, [eventBus]);

  return {
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isFailed: status === 'failed',
    orderData,
  };
};
