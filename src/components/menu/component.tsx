import React, { HTMLAttributes } from 'react';
import styles from './index.module.css';

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Item = ({ children, ...rest }: ItemProps) => (
  <div className={styles.item} {...rest}>
    {children}
  </div>
);

const Menu = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.menu}>
    {children}
  </div>
);

Menu.Item = Item;

export { Menu };
