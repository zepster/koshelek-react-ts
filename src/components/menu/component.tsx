import React from 'react';
import styles from './index.module.css';
import { ItemProps } from './types';

const Item = ({ children, active = false, ...rest }: ItemProps) => {
  const className = `${styles.item} ${active ? styles['item--active'] : ''}`;

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

const Menu = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.menu}>
    {children}
  </div>
);

Menu.Item = Item;

export { Menu };
