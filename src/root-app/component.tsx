import React, { Suspense, useState } from 'react';
import { Header } from './components';
import { LazyComponent, RootAppProps } from './types';
import { Menu } from '../components/menu';

export const RootApp = ({
  pages,
}: RootAppProps) => {
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
        <CurrentComponent />
      </Suspense>
    </>
  );
};
