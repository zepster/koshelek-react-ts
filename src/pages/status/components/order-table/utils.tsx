import React from 'react';

export const getChild = (
  children: React.ReactNode, targetChild: unknown,
) => React.Children.toArray(children)
  .find((child) => {
    if (typeof child === 'object' && 'type' in child) {
      return child.type === targetChild;
    }
    return false;
  });

export const isNumber = (value: unknown) => typeof value === 'number';
