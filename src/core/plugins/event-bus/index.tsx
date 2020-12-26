import { CallbackFunction, EventPayload } from './types';

const ejectEventDetails = (
  cb: CallbackFunction,
) => (
  event: CustomEvent<EventPayload>,
) => cb(event.detail);

const history: { [name: string]: EventPayload } = {};

export const eventBus = ({
  on: (name: string, cb: CallbackFunction) => {
    const handler = ejectEventDetails(cb);
    document.addEventListener(name, handler as EventListener);

    return () => {
      document.removeEventListener(name, handler as EventListener);
    };
  },
  emit: (name: string, payload: EventPayload) => {
    console.log(name);
    const event = new CustomEvent(name, { detail: payload });
    history[name] = payload;
    document.dispatchEvent(event);
  },
  last: (name: string) => history[name],
});

// @ts-ignore
window.e = eventBus;
