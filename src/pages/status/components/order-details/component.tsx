import React from 'react';
import { Asks, Bids } from '../../../../core/plugins/binance-sdk/types';
import styles from './index.module.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  bids: Bids,
  asks: Asks,
}

export const OrderDetails = ({ bids, asks, ...rest }: Props) => (
  <div className={styles.details} {...rest}>
    <div>{asks.join(' - ')}</div>
    &nbsp;
    |
    &nbsp;
    <div>{bids.join(' - ')}</div>
  </div>
);
