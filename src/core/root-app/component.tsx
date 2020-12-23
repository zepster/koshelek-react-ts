import React, { Suspense, useState } from 'react';
import { Header } from './components';
import { LazyComponent, AppConfig } from './types';
import { Menu } from '../../components/menu';
import { core } from '../core';

export const RootApp = ({
  pages,
}: AppConfig) => {
  const [
    CurrentComponent,
    setCurrentComponent,
  ] = useState<LazyComponent>(pages[0].getComponent);

  return (
    <>
      <Header>
        <Menu>
          {pages.map((page) => (
            <Menu.Item
              key={page.name}
              onClick={() => setCurrentComponent(page.getComponent)}
            >
              {page.name}
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Suspense fallback="Loading">
        <CurrentComponent core={core} />
      </Suspense>
    </>
  );
};
