import React from 'react';
import { Core } from '../core';

type CoreProps = {
  core: Core
};

export type LazyComponent = React.LazyExoticComponent<(props: CoreProps) => JSX.Element>;

export type PageConfig = {
  name: string,
  getComponent: LazyComponent;
};

export type AppConfig = {
  pages: PageConfig[],
};
