import { createApp } from './root-app';

const RootApp = createApp({
  pages: [
    {
      name: 'Status',
      getComponent: () => import(
        /* webpackChunkName: "status-page" */
        './pages/status'
      ).then((module) => ({ default: module.StatusPage })),
    },
    {
      name: 'Symbols',
      getComponent: () => import(
        /* webpackChunkName: "symbols-page" */
        './pages/symbols'
      ).then((module) => ({ default: module.SymbolsPage })),
    },
  ],
});

export default RootApp;
