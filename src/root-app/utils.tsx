import { AppConfig } from './types';

export const assertConfig = (config: AppConfig) => {
  if (config.pages.length === 0) {
    // eslint-disable-next-line no-console
    console.warn('RootApp не может быть запущено без страниц.');
  }
};
