import { eventBus } from './event-bus';

describe('plugin:event-bus', () => {
  const spyAddListener = jest.spyOn(document, 'addEventListener');
  const spyRemoveListener = jest.spyOn(document, 'removeEventListener');
  const spyDispatchEvent = jest.spyOn(document, 'dispatchEvent');
  const spyCustomEvent = jest.spyOn(window, 'CustomEvent');

  describe('eventBus', () => {
    describe('`on` method', () => {
      it('should do subscribe', () => {
        const name = 'testName';
        eventBus.on(name, () => {});
        const [calledWithName, fn] = spyAddListener.mock.calls[0];
        expect(spyAddListener).toHaveBeenCalledTimes(1);
        expect(calledWithName).toEqual(name);
        expect(fn).toBeInstanceOf(Function);
        spyAddListener.mockClear();
      });

      it('should return unsubscribe function', () => {
        const name = 'testName';
        const unsub = eventBus.on(name, () => {});
        unsub();
        const [calledWithName, fn] = spyAddListener.mock.calls[0];
        expect(calledWithName).toEqual(name);
        expect(fn).toBeInstanceOf(Function);
        expect(spyRemoveListener).toHaveBeenCalledTimes(1);
        spyAddListener.mockClear();
      });
    });

    describe('`emit` method', () => {
      it('should emit event with payload', () => {
        const eventName = 'eventName';
        const payload = { data: 'payload' };
        const customEvent = { custom: 'event' };
        // @ts-ignore
        spyCustomEvent.mockImplementation(() => customEvent);
        eventBus.emit(eventName, payload);
        expect(spyCustomEvent).toHaveBeenCalledTimes(1);
        expect(spyCustomEvent).toHaveBeenCalledWith(eventName, { detail: payload });
        expect(spyDispatchEvent).toHaveBeenCalledTimes(1);
        expect(spyDispatchEvent).toHaveBeenCalledWith({ custom: 'event' });
        spyCustomEvent.mockClear();
        spyDispatchEvent.mockClear();
      });
    });

    describe('`last` method', () => {
      it('should return nothing if event was not be emitted', () => {
        const eventName = 'latestEvent';
        const result = eventBus.last(eventName);
        expect(result).toBeUndefined();
      });

      it('should return latest emitted event payload', () => {
        const eventName = 'importantEvent';
        const payload = [1, 2, 3];
        eventBus.emit(eventName, payload);
        const result = eventBus.last(eventName);
        expect(result).toBe(payload);
        spyCustomEvent.mockClear();
        spyDispatchEvent.mockClear();
      });
    });
  });
});
