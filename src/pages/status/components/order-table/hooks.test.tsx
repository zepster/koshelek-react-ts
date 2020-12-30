import { renderHook } from '@testing-library/react-hooks';
import { useHeight } from './hooks';

describe('order-table:hooks', () => {
  describe('useHeight', () => {
    it('should return initial value if number was provided', () => {
      const initial = 500;
      const { result } = renderHook(() => useHeight(initial));

      expect(result.current.height).toBe(initial);
    });

    it('should return 0 if height will calculate later', () => {
      const initial = 0;
      const { result } = renderHook(() => useHeight('full'));

      expect(result.current.height).toBe(initial);
    });
  });
});
