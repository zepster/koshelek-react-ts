import React from 'react';

export type LazyComponent = React.LazyExoticComponent<() => JSX.Element>;

export type PageConfig = {
  name: string,
  getComponent: () => Promise<{ default: () => JSX.Element }>;
};

export type LazyPageConfig = {
  name: string,
  getComponent: LazyComponent,
};

export type AppConfig = {
  pages: PageConfig[],
};

export type RootAppProps = {
  pages: LazyPageConfig[],
};
