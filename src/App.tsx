import { createApp } from './root-app';

const RootApp = createApp({
  pages: [
    {
      name: 'Status',
      getComponent: () => import(
        /* webpackChunkName: "status-page" */
        './pages/status'
      ),
    },
    {
      name: 'Symbols',
      getComponent: () => import(
        /* webpackChunkName: "symbols-page" */
        './pages/symbols'
      ),
    },
  ],
});

export default RootApp;
