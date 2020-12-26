import React from 'react';

export type Props = {
  count: number,
  rowHeight: number,
  prerenderCount: number,
  children: (index: number) => React.ReactNode,
};
