import React from 'react';
import {
  render,
} from '@testing-library/react';
import { OrderTable } from './component';

describe('order-table:component', () => {
  describe('Row', () => {
    it('should render Row component', () => {
      const text = 'Row content';
      const component = render(<OrderTable.Row>{text}</OrderTable.Row>);
      expect(component.container).toHaveTextContent(text);
    });
  });

  describe('Header', () => {
    it('should render Header component', () => {
      const text = 'Header content';
      const component = render(<OrderTable.Header>{text}</OrderTable.Header>);
      expect(component.container).toHaveTextContent(text);
    });
  });

  describe('Body', () => {
    it('should render Header component', () => {
      const text = 'Body content';
      const child = () => 'Body content';
      const component = render(<OrderTable.Body>{child}</OrderTable.Body>);
      expect(component.container).toHaveTextContent(text);
    });
  });

  describe('OrderTable', () => {
    it('should render OrderTable component', () => {
      const headerText = 'header text';
      const rowText = 'row text';
      const component = (
        <OrderTable height={500}>
          <OrderTable.Header>
            {headerText}
          </OrderTable.Header>
          <OrderTable.Body>
            {
              () => (
                <OrderTable.Row>
                  {rowText}
                </OrderTable.Row>
              )
            }
          </OrderTable.Body>
        </OrderTable>
      );

      const result = render(component);
      expect(result.container).toHaveTextContent(headerText);
      expect(result.container).toHaveTextContent(rowText);
    });
  });
});
