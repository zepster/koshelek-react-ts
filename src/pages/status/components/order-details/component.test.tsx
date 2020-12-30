import React from 'react';
import {
  render,
} from '@testing-library/react';
import { OrderDetails } from './component';
import { Props } from './types';

describe('order-details:component', () => {
  describe('OrderDetails', () => {
    it('should render OrderDetails component', () => {
      const props = {
        bids: ['3', '2'],
        asks: ['5', '7'],
      } as Props;
      const component = render(<OrderDetails {...props} />);
      expect(component?.container?.firstChild?.childNodes[0]).toHaveTextContent('2');
      expect(component?.container?.firstChild?.childNodes[1]).toHaveTextContent('3');
      expect(component?.container?.firstChild?.childNodes[2]).toHaveTextContent('6');
      expect(component?.container?.firstChild?.childNodes[3]).toHaveTextContent('7');
      expect(component?.container?.firstChild?.childNodes[4]).toHaveTextContent('5');
      expect(component?.container?.firstChild?.childNodes[5]).toHaveTextContent('35');
    });
  });
});
