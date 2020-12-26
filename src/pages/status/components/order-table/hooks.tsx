import { useEffect, useRef, useState } from 'react';
import { TableProps } from './types';
import { isNumber } from './utils';

export const useHeight = (heightParam: TableProps['height']) => {
  const [height, setHeight] = useState(
    isNumber(heightParam) ? heightParam : 0,
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refElement = ref.current;
    const handler = () => {
      const elRect = refElement?.getBoundingClientRect();
      if (elRect) {
        setHeight(window.innerHeight - elRect.top);
      }
    };
    if (!isNumber(heightParam) && refElement) {
      handler();
      window.addEventListener('resize', handler);
    }
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [heightParam]);

  return { height, ref };
};
