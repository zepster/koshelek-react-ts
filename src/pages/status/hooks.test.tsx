import { renderHook, act } from '@testing-library/react-hooks';
import { defaultState, useEvents } from './hooks';
import { ORDER_LOAD_STATUS_CHANGE, ORDER_UPDATE } from '../../config';

describe('pages:status:hooks', () => {
  const mockOn = jest.fn();
  const mockLast = jest.fn();
  const core = {
    plugins: {
      eventBus: {
        on: mockOn,
        last: mockLast,
      },
    },
  };

  describe('useEvents', () => {
    it('should fill state from latest value', async () => {
      mockOn.mockImplementation(() => () => ({}));
      renderHook(() => useEvents(core as any));
      expect(mockLast).toHaveBeenNthCalledWith(1, ORDER_LOAD_STATUS_CHANGE);
      expect(mockLast).toHaveBeenNthCalledWith(2, ORDER_UPDATE);
      mockOn.mockClear();
    });

    it('should subscribe on updates', () => {
      mockOn.mockImplementation(() => () => ({}));
      renderHook(() => useEvents(core as any));
      expect(mockOn.mock.calls[0][0]).toEqual(ORDER_UPDATE);
      expect(mockOn.mock.calls[1][0]).toEqual(ORDER_LOAD_STATUS_CHANGE);
      mockOn.mockClear();
    });

    it('should return state without data', () => {
      mockOn.mockImplementation(() => () => ({}));
      const { result } = renderHook(() => useEvents(core as any));
      expect(result.current).toEqual({
        isLoading: false,
        isSuccess: false,
        isFailed: false,
        orderData: defaultState,
        orderDataLen: 0,
      });
      mockOn.mockClear();
    });

    it('should handle loading status', () => {
      mockOn.mockImplementation(() => () => ({}));
      mockLast.mockImplementation((name) => {
        if (name === ORDER_LOAD_STATUS_CHANGE) {
          return 'loading';
        }
        return undefined;
      });
      const { result } = renderHook(() => useEvents(core as any));
      expect(result.current).toHaveProperty('isLoading', true);
      expect(result.current).toHaveProperty('isSuccess', false);
      mockOn.mockClear();
    });

    it('should handle success status', () => {
      mockOn.mockImplementation(() => () => ({}));
      mockLast.mockImplementation((name) => {
        if (name === ORDER_LOAD_STATUS_CHANGE) {
          return 'success';
        }
        return undefined;
      });
      const { result } = renderHook(() => useEvents(core as any));
      expect(result.current).toHaveProperty('isLoading', false);
      expect(result.current).toHaveProperty('isSuccess', true);
      mockOn.mockClear();
    });

    it('should handle failed status', () => {
      mockOn.mockImplementation(() => () => ({}));
      mockLast.mockImplementation((name) => {
        if (name === ORDER_LOAD_STATUS_CHANGE) {
          return 'failed';
        }
        return undefined;
      });
      const { result } = renderHook(() => useEvents(core as any));
      expect(result.current).toHaveProperty('isLoading', false);
      expect(result.current).toHaveProperty('isFailed', true);
      mockOn.mockClear();
    });

    it('should handle handle ORDER_LOAD_STATUS_CHANGE event from event-bus', () => {
      let changeStatusCb: any;
      mockOn.mockImplementation((name, cb) => {
        if (name === ORDER_LOAD_STATUS_CHANGE) {
          changeStatusCb = cb;
        }
        return () => {};
      });
      const { result } = renderHook(() => useEvents(core as any));
      act(() => {
        changeStatusCb('loading');
      });
      expect(result.current).toHaveProperty('isLoading', true);
      expect(result.current).toHaveProperty('isSuccess', false);
      expect(result.current).toHaveProperty('isFailed', false);
      mockOn.mockClear();
    });

    it('should handle handle ORDER_UPDATE event from event-bus', () => {
      let changeStatusCb: any;
      const orderData = {
        ...defaultState,
        asks: [1, 2],
        bids: [1, 2],
      };
      mockOn.mockImplementation((name, cb) => {
        if (name === ORDER_UPDATE) {
          changeStatusCb = cb;
        }
        return () => {};
      });
      const { result } = renderHook(() => useEvents(core as any));
      act(() => {
        changeStatusCb({
          data: orderData,
        });
      });
      expect(result.current).toHaveProperty('orderDataLen', 2);
      expect(result.current).toHaveProperty('orderData', orderData);
      mockOn.mockClear();
    });
  });
});
