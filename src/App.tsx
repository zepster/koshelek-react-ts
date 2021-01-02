import React from 'react';
import { createApp } from './core/root-app';
import { Core } from './core/core';

const RootApp = createApp({
  pages: [
    {
      name: 'Status',
      getComponent: (core: Core) => React.lazy(() => import(
        /* webpackChunkName: "status-page" */
        './pages/status/with-model'
      ).then((module) => module.default(core))),
    },
    {
      name: 'Symbols',
      getComponent: () => React.lazy(() => import(
        /* webpackChunkName: "symbols-page" */
        /* webpackPrefetch: true */
        './pages/symbols'
      )),
    },
  ],
});

export default RootApp;
