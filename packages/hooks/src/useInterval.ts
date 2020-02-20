// Credit: https://overreacted.io/making-setinterval-declarative-with-react-hooks/

import * as React from "react";

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = React.useRef<Function>();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
