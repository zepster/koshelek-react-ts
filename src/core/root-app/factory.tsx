import React from 'react';
import { RootApp } from './component';
import { AppConfigOptions } from './types';
import { core } from '../core';

export const createApp = (config: AppConfigOptions) => {
  const pages = config.pages.map((page) => ({
    ...page,
    getComponent: page.getComponent(core),
  }));

  return () => <RootApp pages={pages} />;
};
