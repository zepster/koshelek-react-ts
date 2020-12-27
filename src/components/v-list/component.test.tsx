import React from 'react';
import {
  render,
} from '@testing-library/react';
import { VList } from './component';

let mockHookResult = {
  scrollTop: 0,
  ref: null,
};

jest.mock('./hooks', () => ({
  useScrollListener: () => mockHookResult,
}));

describe('components:Vlist', () => {
  describe('VList', () => {
    it('should render VList component with correct visible item', () => {
      mockHookResult = {
        scrollTop: 0,
        ref: null,
      };
      let c = 0;
      const RenderItem = () => {
        c += 1;
        return <div>{c}</div>;
      };

      render(
        <VList
          count={20}
          rowHeight={10}
          height={100}
          prerenderCount={0}
        >
          {(index) => <RenderItem key={index} />}
        </VList>,
      );

      expect(c).toBe(10);
    });

    it('should render VList component with correct visible item. prerenderCount', () => {
      mockHookResult = {
        scrollTop: 0,
        ref: null,
      };
      let c = 0;
      const RenderItem = () => {
        c += 1;
        return <div>{c}</div>;
      };

      render(
        <VList
          count={20}
          rowHeight={10}
          height={100}
          prerenderCount={2}
        >
          {(index) => <RenderItem key={index} />}
        </VList>,
      );

      expect(c).toBe(14);
    });

    it('should render VList component with correct visible item. prerenderCount, offset', () => {
      mockHookResult = {
        scrollTop: 150,
        ref: null,
      };
      let c = 0;
      const RenderItem = () => {
        c += 1;
        return <div>{c}</div>;
      };

      render(
        <VList
          count={20}
          rowHeight={10}
          height={100}
          prerenderCount={2}
        >
          {(index) => <RenderItem key={index} />}
        </VList>,
      );

      expect(c).toBe(7);
    });
  });
});
