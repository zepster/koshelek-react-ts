import React from 'react';

export type Props = {
  value: string,
  id: string,
  onChange: (value: string) => void,
  options: string[],
  optionRender: (value: string) => React.ReactNode,
};
