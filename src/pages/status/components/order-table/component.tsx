import React from 'react';
import styles from './index.module.css';
import { Props, TableProps } from './types';
import { getChild } from './utils';
import { useHeight } from './hooks';

const Header = ({ children }: Props) => (
  <div className={styles.header}>{ children }</div>
);

const Body = ({ children }: Props) => (
  <div className={styles.body}>{ children }</div>
);

const Row = ({ children }: Props) => (
  <div className={styles.row}>{ children }</div>
);

const Table = ({ children, height }: TableProps) => {
  const header = getChild(children, Header);
  const body = getChild(children, Body);
  const { height: refHeight, ref } = useHeight(height);

  return (
    <div
      ref={ref}
      style={{ height: refHeight }}
      className={styles.table}
    >
      {header}
      {body}
    </div>
  );
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export const OrderTable = Table;
