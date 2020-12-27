import React from 'react';
import styles from './index.module.css';

type Props = {
  text: string,
  type?: 'danger'
};

export const Notification = ({ text, type = 'danger' }: Props) => (
  <div
    className={`${styles.notification} ${styles[`notification--${type}`]}`}
  >
    {text}
  </div>
);
