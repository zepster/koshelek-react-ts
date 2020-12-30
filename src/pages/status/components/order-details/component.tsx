import React from 'react';
import styles from './index.module.css';
import { Props } from './types';

export const OrderDetails = ({ bids, asks, ...rest }: Props) => {
  const [priceB, qtyB] = bids.map((v) => +v);
  const [priceA, qtyA] = asks.map((v) => +v);

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

export const OrderLegend = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`${styles.details} ${styles.legend}`} {...props}>
    <div className={styles.qty}>Amount</div>
    <div className={styles.price}>Price</div>
    <div className={styles.total}>Total</div>

    <div className={styles.qty}>Amount</div>
    <div className={styles.price}>Price</div>
    <div className={styles.total}>Total</div>
  </div>
);
