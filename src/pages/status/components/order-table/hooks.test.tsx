import { renderHook } from '@testing-library/react-hooks';
import { useHeight } from './hooks';

describe('order-table:hooks', () => {
  describe('useHeight', () => {
    it('Должен вернуть инитиал значение, если это число', () => {
      const initial = 500;
      const { result } = renderHook(() => useHeight(initial));

      expect(result.current.height).toBe(initial);
    });

    it('Должен вернуть 0 если инитиал не число', () => {
      const initial = 0;
      const { result } = renderHook(() => useHeight('full'));

      expect(result.current.height).toBe(initial);
    });
  });
});
