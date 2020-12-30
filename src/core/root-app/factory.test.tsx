import { createApp } from './factory';

const core = {
  plugins: {},
};

jest.mock('../core', () => ({
  core,
}));

describe('rootApp:factory', () => {
  it('should provide core to sub-pages', () => {
    const mockGetComponent = jest.fn();
    mockGetComponent.mockImplementation(() => ({}));
    const config = [
      {
        name: 'Name1',
        getComponent: mockGetComponent,
      },
    ];
    createApp({ pages: config as any });
    expect(mockGetComponent).toHaveBeenCalledTimes(1);
    expect(mockGetComponent).toHaveBeenCalledWith(core);
    mockGetComponent.mockClear();
  });

  it('should return function', () => {
    expect(createApp({ pages: [] })).toBeInstanceOf(Function);
  });
});
