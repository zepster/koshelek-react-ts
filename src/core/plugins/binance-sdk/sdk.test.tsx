import { loadOrders, subscribeDiff } from './sdk';

describe('plugin:banance-sdk', () => {
  describe('loadOrders', () => {
    const spyFetch = jest.spyOn(window, 'fetch');
    it('should return json data from response', async () => {
      const data = { text: 'some text' };
      spyFetch.mockResolvedValueOnce({
        json: async () => data,
      } as Response);
      const result = await loadOrders('test');
      expect(result).toEqual(data);
    });

    it('should provide error', async () => {
      const data = { text: 'some text' };
      // @ts-ignore
      spyFetch.mockResolvedValueOnce({
        json: async () => { throw new Error(''); },
      } as Response);
      const mockErrorHandler = jest.fn();
      try {
        await loadOrders('test');
      } catch (e) {
        mockErrorHandler(e);
      }
      expect(mockErrorHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('subscribeDiff', () => {
    const spyWS = jest.spyOn(window, 'WebSocket')
      // @ts-ignore
      .mockImplementation(() => ({}));
    it('should create new WS', () => {
      // @ts-ignore
      spyWS.mockImplementation(() => ({}));
      subscribeDiff('symbol', () => {});
      expect(spyWS).toHaveBeenCalledTimes(1);
    });

    it('should return unsubscribe function', () => {
      const closeFn = jest.fn();
      // @ts-ignore
      spyWS.mockImplementation(() => ({ close: closeFn }));
      const unsub = subscribeDiff('symbol', () => {});
      unsub();
      expect(closeFn).toHaveBeenCalledTimes(1);
    });

    it('should provide parsed event data to cb', () => {
      const rawData = 'false';
      const cb = jest.fn();
      const socket = {};
      // @ts-ignore
      spyWS.mockImplementation(() => socket);
      subscribeDiff('symbol', cb);
      // @ts-ignore
      socket.onmessage({ data: rawData });
      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb).toHaveBeenCalledWith(JSON.parse(rawData));
    });
  });
});
