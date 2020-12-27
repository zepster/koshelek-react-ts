import { useEffect, useRef, useState } from 'react';

export const useScrollListener = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = ref;
    const handler = () => setScrollTop(current?.scrollTop || 0);
    current?.addEventListener('scroll', handler);

    return () => {
      current?.removeEventListener('scroll', handler);
    };
  }, []);

  return { scrollTop, ref };
};
