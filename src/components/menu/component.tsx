import React from 'react';
import styles from './index.module.css';
import { ItemProps, MenuProps } from './types';

const MenuContext = React.createContext('');

const Item = ({ children, name, ...rest }: ItemProps) => {
  const activeItem = React.useContext(MenuContext);
  const isActive = activeItem === name;

  const className = `${styles.item} ${isActive ? styles['item--active'] : ''}`;

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

const Menu = ({ children, active }: MenuProps) => (
  <MenuContext.Provider value={active}>
    <div className={styles.menu}>
      {children}
    </div>
  </MenuContext.Provider>
);

Menu.Item = Item;

export { Menu };
