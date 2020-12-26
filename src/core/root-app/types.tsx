import React from 'react';
import { Core } from '../core';

export type CoreProps = {
  core: Core,
};

export type LazyComponent = React.LazyExoticComponent<(props: CoreProps) => JSX.Element>;

export type PageConfig = {
  name: string,
  getComponent: LazyComponent,
};

export type AppConfig = {
  pages: PageConfig[],
};

export type AppConfigOptions = {
  pages: {
    name: string,
    getComponent: (core: Core) => LazyComponent,
  }[],
};
