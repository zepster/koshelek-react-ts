import React, {
  Suspense, useState,
} from 'react';
import { Header } from './components';
import {
  AppConfig, PageConfig,
} from './types';
import { Menu } from '../../components/menu';
import { core } from '../core';
import styles from './index.module.css';

const getIndex = (arr: PageConfig[], pageName: string) => arr.findIndex(
  (page) => page.name === pageName,
);

export const RootApp = ({
  pages,
}: AppConfig) => {
  const [
    currentPage,
    setCurrentPage,
  ] = useState<PageConfig>(pages[0]);

  const getStyle = () => {
    const currentIndex = getIndex(pages, currentPage.name);

    return {
      transform: `translateX(${100 * (currentIndex) * -1}%)`,
    };
  };

  return (
    <>
      <Header>
        <Menu active={currentPage.name}>
          {pages.map((page) => (
            <Menu.Item
              key={page.name}
              onClick={() => setCurrentPage(page)}
              name={page.name}
            >
              {page.name}
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <div
        className={styles['root-container']}
      >
        {
          pages.map(
            ({
              name,
              getComponent: Component,
            }) => (
              <div
                key={name}
                style={getStyle()}
                className={styles.animate}
              >
                <Suspense fallback="Loading">
                  <Component core={core} />
                </Suspense>
              </div>
            ),
          )
        }
      </div>
    </>
  );
};
