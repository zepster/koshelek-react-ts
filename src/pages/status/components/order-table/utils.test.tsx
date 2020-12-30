import React from 'react';
import { isNumber, getChild } from './utils';

describe('order-table:utils', () => {
  describe('isNumber', () => {
    it('short detect number', () => {
      expect(isNumber(2)).toBeTruthy();
    });

    it('should not detect number', () => {
      const types = ['', false, {}, []];
      const result = types.every((type) => !isNumber(type));
      expect(result).toBeTruthy();
    });
  });

  describe('rowText', () => {
    it('should find child', () => {
      const Component = () => <div>Text</div>;
      const result = getChild(<Component />, Component);
      // @ts-ignore
      expect(result.type).toBe(Component);
    });

    it('should not find child', () => {
      const Component = () => <div>Text</div>;
      const result = getChild(<div>Some div</div>, Component);
      expect(result).toBeUndefined();
    });
  });
});
