import React from 'react';
import {
  render,
} from '@testing-library/react';
import { SelectControl } from './component';

describe('components:SelectControl', () => {
  describe('SelectControl', () => {
    it('should render SelectControl component', () => {
      const value = '1';
      const id = 'id';
      const onChange = jest.fn();
      const options = ['1', '2', '3'];
      const { container } = render(<SelectControl
        value={value}
        id={id}
        onChange={onChange}
        options={options}
        optionRender={(v) => <option value={v} key={v}>{v}</option>}
      />);

      expect(container.querySelector(`label[for='${id}']`)).toBeTruthy();
      expect(container.querySelector(`select[id=${id}]`)).toBeTruthy();
      // @ts-ignore
      expect(container.querySelector(`#${id}`)?.value).toBe(value);
    });
  });
});
