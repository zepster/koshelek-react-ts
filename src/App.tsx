import React from 'react';
import { createApp } from './core/root-app';

const RootApp = createApp({
  pages: [
    {
      name: 'Status',
      getComponent: React.lazy(() => import(
        /* webpackChunkName: "status-page" */
        './pages/status'
      )),
    },
    {
      name: 'Symbols',
      getComponent: React.lazy(() => import(
        /* webpackChunkName: "symbols-page" */
        './pages/symbols'
      )),
    },
  ],
});

export default RootApp;
