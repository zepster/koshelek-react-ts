import React, { HTMLAttributes } from 'react';

export interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  active?: boolean,
}
