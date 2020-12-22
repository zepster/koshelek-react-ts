import React from 'react';
import { RootApp } from './component';
import { AppConfig } from './types';
import { assertConfig } from './utils';

export const createApp = (config: AppConfig) => {
  assertConfig(config);
  const pages = config.pages.map((page) => ({
    ...page,
    getComponent: React.lazy(page.getComponent),
  }));

  if (pages.length === 0) {
    pages.push({
      name: 'RootApp',
      getComponent: React.lazy(
        () => import('./components/empty-page')
          .then((module) => ({ default: module.EmptyPage })),
      ),
    });
  }

  return () => <RootApp pages={pages} />;
};
