import { useCallback, useState } from 'react';

export function useCarousel(length: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (target: number) => {
      if (length <= 0) {
        return;
      }

      const normalized = ((target % length) + length) % length;
      setActiveIndex(normalized);
    },
    [length]
  );

  const next = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const prev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  return { activeIndex, goTo, next, prev };
}
