import React from 'react';
import { Asks, Bids } from '../../../../core/plugins/binance-sdk/types';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  bids: Bids,
  asks: Asks,
}
