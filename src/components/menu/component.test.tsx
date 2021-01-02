import React from 'react';
import {
  render,
} from '@testing-library/react';
import { Menu } from './component';
import styles from './index.module.css';

describe('components:menu', () => {
  describe('Item', () => {
    it('should render Item component', () => {
      const text = 'item content';
      const component = render(<Menu.Item name={text}>{text}</Menu.Item>);
      expect(component.container).toHaveTextContent(text);
    });

    it('should render Item component. active', () => {
      const text = 'item content';
      const { container } = render(
        <Menu active={text}>
          <Menu.Item name={text}>{text}</Menu.Item>
        </Menu>,
      );

      expect(container).toHaveTextContent(text);
      expect(container.querySelector(`.${styles['item--active']}`)).toBeTruthy();
    });
  });

  describe('Menu', () => {
    it('should render Menu component', () => {
      const text = 'menu content';
      const { container } = render(<Menu active="">{text}</Menu>);
      expect(container).toHaveTextContent(text);
    });
  });
});
