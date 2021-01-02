import React from 'react';
import styles from './index.module.css';
import { ItemProps, MenuProps } from './types';

const MenuContext = React.createContext({
  active: '',
  updateActive: (element: HTMLDivElement) => {},
});

const useActive = (itemKey: string) => {
  const { active, updateActive } = React.useContext(MenuContext);
  const activeItemRef = React.useRef<HTMLDivElement>(null);
  const isActive = active === itemKey;

  React.useEffect(() => {
    if (isActive && activeItemRef.current) {
      updateActive(activeItemRef.current);
    }
  },
  [isActive, updateActive]);

  return {
    isActive,
    ref: activeItemRef,
  };
};

const Item = ({ children, name, ...rest }: ItemProps) => {
  const { ref } = useActive(name);
  return (
    <div ref={ref} className={styles.item} {...rest}>
      {children}
    </div>
  );
};

const Menu = ({ children, active }: MenuProps) => {
  const [barStyles, setBarStyles] = React.useState({});
  const menuRef = React.useRef<HTMLDivElement>(null);
  const ctxValue = React.useMemo(() => ({
    active,
    updateActive: (el: HTMLDivElement) => {
      setBarStyles(getRect(el, menuRef.current));
    },
  }), [active]);

  return (
    <MenuContext.Provider value={ctxValue}>
      <div ref={menuRef} className={styles.menu}>
        {children}
        <div
          className={styles['active-bar']}
          style={barStyles}
        />
      </div>
    </MenuContext.Provider>
  );
};

Menu.Item = Item;

function getRect(
  element: HTMLDivElement,
  parentElement: HTMLDivElement | null | undefined,
) {
  const rect = element.getBoundingClientRect();
  const parentRect = parentElement ? parentElement.getBoundingClientRect() : { left: 0 };
  return {
    width: rect.width,
    transform: `translateX(${rect.left - parentRect.left}px)`,
  };
}

export { Menu };
