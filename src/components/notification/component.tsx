import React from 'react';
import styles from './index.module.css';
import { Props } from './types';

export const Notification = ({ text, type = 'danger' }: Props) => (
  <div
    className={`${styles.notification} ${styles[`notification--${type}`]}`}
  >
    {text}
  </div>
);
