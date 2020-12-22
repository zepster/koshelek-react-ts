import React from 'react';

export type PageConfig = {
  name: string,
  getComponent: () => Promise<React.ReactNode>
};
export type AppConfig = {
  pages: PageConfig[],
};
