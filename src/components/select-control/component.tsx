import React from 'react';
import { Props } from './types';

export const SelectControl = ({
  id, value, onChange, options, optionRender,
}: Props) => (
  <label htmlFor={id}>
    Symbol:
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {
        options.map(optionRender)
      }
    </select>
  </label>
);
