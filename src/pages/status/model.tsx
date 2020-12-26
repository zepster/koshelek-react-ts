import { Props } from './types';
import {
  DEFAULT_SYMBOL,
  ORDER_LOAD_STATUS_CHANGE,
  ORDER_UPDATE,
  SYMBOL_UPDATE,
  WS_DIFF_MESSAGE, WS_DIFF_MESSAGE_COLLECT,
} from '../../config';
import { Diff } from '../../core/plugins/binance-sdk/types';

export const init = (core: Props['core']) => {
  let closeSocket: Function;
  const { eventBus, binanceSdk } = core.plugins;
  const loadHandler = async (symbol: string) => {
    eventBus.emit(ORDER_LOAD_STATUS_CHANGE, 'loading');
    try {
      const orders = await binanceSdk.loadOrders(symbol);
      eventBus.emit(ORDER_UPDATE, {
        symbol: DEFAULT_SYMBOL,
        data: orders,
      });
      eventBus.emit(ORDER_LOAD_STATUS_CHANGE, 'success');
    } catch (e) {
      eventBus.emit(ORDER_LOAD_STATUS_CHANGE, 'failed');
    }
  };

  const socketSubscribe = (symbol: string) => binanceSdk.subscribeDiff(
    symbol,
    (diff) => eventBus.emit(WS_DIFF_MESSAGE, diff),
  );

  /**
   * Загрузить стакан
   */
  loadHandler(DEFAULT_SYMBOL);
  /**
   *  Подписка на WS
   */
  closeSocket = socketSubscribe(DEFAULT_SYMBOL);

  /**
   * Обновить стакан и переподписаться на WS
   */
  eventBus.on(SYMBOL_UPDATE, async (symbol) => {
    closeSocket();
    await loadHandler(symbol as string);
    closeSocket = socketSubscribe(symbol as string);
    eventBus.emit(WS_DIFF_MESSAGE_COLLECT, []);
  });

  /**
   * Коллектить всю историю дифов
   */
  eventBus.on(WS_DIFF_MESSAGE, (diff) => {
    const lastValue = eventBus.last(WS_DIFF_MESSAGE_COLLECT) as Diff[] || [];
    eventBus.emit(WS_DIFF_MESSAGE_COLLECT, lastValue.concat(diff as Diff));
  });
};
