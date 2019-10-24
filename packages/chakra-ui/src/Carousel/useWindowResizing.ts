import { useEffect, useState } from 'react';

export default function useWindowResizing() {
  const [isResizing, setResizing] = useState(false);

  useEffect(() => {
    let timeoutID = 0;

    function handleResizeEnd() {
      setResizing(false);
    }

    function handleResize() {
      clearTimeout(timeoutID);
      setResizing(true);
      timeoutID = window.setTimeout(handleResizeEnd, 150);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutID);
    };
  }, []);

  return isResizing;
}
