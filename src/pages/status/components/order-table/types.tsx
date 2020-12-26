import React from 'react';

type HeightParam = number | 'full';

export type Props = {
  children: React.ReactNode,
};

export type BodyProps = {
  children: (height: number) => React.ReactNode
};

export type TableProps = {
  children: React.ReactNode,
  height: HeightParam
};
