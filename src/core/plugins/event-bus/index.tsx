import { CallbackFunction, EventPayload } from './types';

const ejectEventDetails = (
  cb: CallbackFunction,
) => (
  event: CustomEvent<EventPayload>,
) => cb(event.detail);

export const eventBus = ({
  on: (name: string, cb: CallbackFunction) => {
    const handler = ejectEventDetails(cb);
    document.addEventListener(name, handler as EventListener);

    return () => {
      document.removeEventListener(name, handler as EventListener);
    };
  },
  emit: (name: string, payload: EventPayload) => {
    const event = new CustomEvent(name, { detail: payload });
    document.dispatchEvent(event);
  },
});
