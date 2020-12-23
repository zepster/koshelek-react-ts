export interface EventPayload extends Object {
  [key: string]: any
}

export type CallbackFunction = (payload: EventPayload) => void;
