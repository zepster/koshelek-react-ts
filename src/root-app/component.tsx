import React from 'react';
import { Header } from './components/header';

const ROOT_CONTAINER = 'root-container';

export const RootApp = () => (
  <>
    <Header />
    <div id={ROOT_CONTAINER}>
      Container
    </div>
  </>
);
