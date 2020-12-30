import React from 'react';
import {
  render,
} from '@testing-library/react';
import { Notification } from './component';
import styles from './index.module.css';

describe('components:Notification', () => {
  describe('Notification', () => {
    it('should render Notification component', () => {
      const text = 'notification text';
      const { container } = render(<Notification text={text} />);
      expect(container).toHaveTextContent(text);
      expect(container.querySelector(`.${styles.notification}`)).toBeTruthy();
    });

    it('should render Notification component. Default type', () => {
      const text = 'notification text';
      const { container } = render(<Notification text={text} />);
      expect(container.querySelector(`.${styles['notification--danger']}`)).toBeTruthy();
    });
  });
});
