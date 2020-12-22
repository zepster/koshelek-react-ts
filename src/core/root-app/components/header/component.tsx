import React from 'react';
import styles from './index.module.css';

export const Header = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.header}>{children}</div>
);
