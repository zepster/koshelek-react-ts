import React from 'react';
import { RootApp } from './component';
import { AppConfig } from './types';

export const createApp = (config: AppConfig) => {
  const { pages } = config;

  return () => <RootApp pages={pages} />;
};
