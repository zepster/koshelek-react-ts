import React from 'react';
import styles from './index.module.css';

const ITEMS = [
  'Таблица',
  'Символ',
];

export const Header = () => (
  <div className={styles.header}>
    {ITEMS.map((item) => (
      <div
        className={styles.item}
        key={item}
      >
        {item}
      </div>
    ))}
  </div>
);
