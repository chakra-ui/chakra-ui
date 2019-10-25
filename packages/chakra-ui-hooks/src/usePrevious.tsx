import * as React from "react";

function usePrevious<T>(value: T) {
  const valueRef = React.useRef<T>();

  React.useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef.current;
}

export default usePrevious;
