import React from 'react';
import { Header } from './components/header';
import { PageConfig } from './types';
import { Menu } from '../components/menu';

const ROOT_CONTAINER = 'root-container';

type Props = {
  pages: PageConfig[],
};

export const RootApp = ({
  pages,
}: Props) => {
  const loadComponent = (resolver: Function) => resolver();

  return (
    <>
      <Header>
        <Menu>
          {pages.map((page) => (
            <Menu.Item
              key={page.name}
              onClick={() => loadComponent(page.getComponent)}
            >
              {page.name}
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <div id={ROOT_CONTAINER} />
    </>
  );
};
