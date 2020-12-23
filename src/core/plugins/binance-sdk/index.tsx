import { Diff } from './types';

const BINANCE_HOST = 'https://api.binance.com';
const STREAM_BINANCE_HOST = 'wss://stream.binance.com:9443/ws';
const ORDER_BOOK = '/api/v3/depth';

const getOrderUrl = (
  symbol: string,
  limit: number = 20,
) => `${BINANCE_HOST}${ORDER_BOOK}?symbol=${symbol}&limit=${limit}`;

const createSocket = (
  symbol: string,
) => new WebSocket(`${STREAM_BINANCE_HOST}/${symbol}@depth`);

export const loadOrders = (symbol: string) => fetch(getOrderUrl(symbol))
  .then((response) => response.json());

export const subscribeDiff = (
  symbol: string,
  onMessage: (event: Diff) => void,
) => {
  const socket = createSocket(symbol);

  socket.onmessage = (event) => onMessage(JSON.parse(event.data));

  return () => {
    socket.close();
  };
};
