import React, {
  Suspense, useMemo, useState,
} from 'react';
import { Header } from './components';
import {
  AppConfig, PageConfig,
} from './types';
import { Menu } from '../../components/menu';
import { core } from '../core';

export const RootApp = ({
  pages,
}: AppConfig) => {
  const [
    currentPage,
    setCurrentPage,
  ] = useState<PageConfig>(pages[0]);

  const Component = useMemo(() => currentPage.getComponent, [currentPage]);

  return (
    <>
      <Header>
        <Menu>
          {pages.map((page) => (
            <Menu.Item
              key={page.name}
              onClick={() => setCurrentPage(page)}
            >
              {page.name}
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Suspense fallback="Loading">
        <Component core={core} />
      </Suspense>
    </>
  );
};
