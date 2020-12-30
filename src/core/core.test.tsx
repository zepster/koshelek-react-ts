import { core } from './core';

describe('core', () => {
  it('should be defined', () => {
    expect(core).toBeDefined();
  });

  it('should provide plugins', () => {
    expect(core).toHaveProperty('plugins');
  });
});
