import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';

type Props = {
  count: number,
  rowHeight: number,
  offset: number,
  children: (index: number) => React.ReactNode,
};

const getVisibleRows = (
  containerHeight: number,
  rowHeight: number,
  offset: number,
) => Math.ceil(containerHeight / rowHeight) + offset;

export const VList = ({
  count,
  rowHeight, // 20
  children,
  offset,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pTopRef = useRef<number>(0);
  const [countToShow, setCountToShow] = useState<number>(0);
  const [offsetRow, setOffsetRow] = useState(0);

  useEffect(() => {
    const t = Math.min(count, getVisibleRows(500, rowHeight, offset));
    setCountToShow(t);
  }, [count, rowHeight, offset]);

  const onScrollHandler = () => {
    const { current: divElement } = containerRef;
    const scrollTop = divElement?.scrollTop || 0;

    const newOffsetRow = Math.ceil(scrollTop / rowHeight);
    pTopRef.current = newOffsetRow * rowHeight;
    setOffsetRow(newOffsetRow);
  };

  return (
    <div
      onScroll={onScrollHandler}
      ref={containerRef}
      className={styles['v-list']}
      style={{ height: 500 }}
    >
      <div style={{ height: count * rowHeight, paddingTop: pTopRef.current }}>
        {Array.from(Array(countToShow)).map(
          (i, index) => children(index + offsetRow),
        )}
      </div>
    </div>
  );
};
