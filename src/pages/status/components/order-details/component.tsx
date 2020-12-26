import React from 'react';
import { Asks, Bids } from '../../../../core/plugins/binance-sdk/types';
import styles from './index.module.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  bids: Bids,
  asks: Asks,
}

export const OrderDetails = ({ bids, asks, ...rest }: Props) => {
  const [priceB, qtyB] = bids.map((v) => +v);
  const [priceA, qtyA] = bids.map((v) => +v);

  return (
    <div className={styles.details} {...rest}>
      <div className={styles.qty}>{qtyB}</div>
      <div className={styles.price}>{priceB}</div>
      <div className={styles.total}>{qtyB * priceB}</div>

      <div className={styles.qty}>{qtyA}</div>
      <div className={styles.price}>{priceA}</div>
      <div className={styles.total}>{qtyA * priceA}</div>
    </div>
  );
};
