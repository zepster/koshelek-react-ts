import React from 'react';
import styles from './index.module.css';

type Props = {
  children: React.ReactNode,
};

const getChild = (
  children: React.ReactNode, targetChild: unknown,
) => React.Children.toArray(children)
  .find((child) => {
    if (typeof child === 'object' && 'type' in child) {
      return child.type === targetChild;
    }
    return false;
  });

const Header = ({ children }: Props) => (
  <div className="header">{ children }</div>
);

const Body = ({ children }: Props) => (
  <div className="body">{ children }</div>
);

const Row = ({ children }: Props) => (
  <div className={styles.row}>{ children }</div>
);

const Table = ({ children }: Props) => {
  const header = getChild(children, Header);
  const body = getChild(children, Body);

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        {header}
      </div>
      <div className={styles.body}>
        {body}
      </div>
    </div>
  );
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export const OrderTable = Table;
