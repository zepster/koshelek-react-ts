import { loadOrders, subscribeDiff } from './plugins/binance-sdk';
import { eventBus } from './plugins/event-bus';

export const core = {
  plugins: {
    binanceSdk: {
      loadOrders,
      subscribeDiff,
    },
    eventBus,
  },
};

export type Core = typeof core;
