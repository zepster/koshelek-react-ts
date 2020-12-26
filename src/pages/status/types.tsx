import { Orders } from '../../core/plugins/binance-sdk/types';
import { CoreProps } from '../../core/root-app/types';

export type Props = CoreProps;

export type OrderUpdatePayload = {
  symbol: string,
  data: Orders,
};
