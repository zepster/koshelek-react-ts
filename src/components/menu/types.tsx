import React, { HTMLAttributes } from 'react';

export interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  name: string,
}

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  active: string,
}
