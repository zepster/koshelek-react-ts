import { Diff, Orders } from './types';
import { ORDER_LIMIT } from '../../../config';

const BINANCE_HOST = 'https://api.binance.com';
const STREAM_BINANCE_HOST = 'wss://stream.binance.com:9443/ws';
const ORDER_BOOK = '/api/v3/depth';

const getOrderUrl = (
  symbol: string,
  limit: number = ORDER_LIMIT,
) => `${BINANCE_HOST}${ORDER_BOOK}?symbol=${symbol.toUpperCase()}&limit=${limit}`;

const createSocket = (
  symbol: string,
) => new WebSocket(`${STREAM_BINANCE_HOST}/${symbol}@depth`);

export const loadOrders = (symbol: string): Promise<Orders> => fetch(getOrderUrl(symbol))
  .then((response) => response.json());

export const subscribeDiff = (
  symbol: string,
  onMessage: (event: Diff) => void,
) => {
  const socket = createSocket(symbol.toLowerCase());

  socket.onmessage = (event) => onMessage(JSON.parse(event.data));

  return () => {
    socket.close();
  };
};
