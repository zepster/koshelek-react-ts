import React, { HTMLAttributes } from 'react';
import styles from './index.module.css';

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  active?: boolean,
}

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
