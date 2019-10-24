import { useCallback, useState } from 'react';

export default function useHover(mouseOnly = false) {
  const [isHovered, setHovered] = useState(false);

  const onTouchStart = useCallback(() => {
    setHovered(true);
  }, []);
  const onTouchEnd = useCallback(() => {
    setHovered(false);
  }, []);

  return [
    isHovered,
    {
      ...(!mouseOnly && { onTouchStart, onTouchEnd }),
      onMouseEnter: useCallback(() => {
        setHovered(true);
      }, []),
      onMouseLeave: useCallback(() => {
        setHovered(false);
      }, []),
    },
  ] as const;
}
