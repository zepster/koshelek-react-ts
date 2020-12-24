import { Core } from '../../core/core';

type OwnProps = {
  core: Core,
};

export type Props = OwnProps;

export type Orders = {
  lastUpdateId: number,
  bids: [string, string][]
  asks: [string, string][]
};
export type OrderUpdatePayload = {
  symbol: string,
  data: Orders,
};
