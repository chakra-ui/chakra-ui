import * as React from "react";

function useLiveRef<T>(value: T) {
  const savedRef = React.useRef(value);
  React.useEffect(() => {
    savedRef.current = value;
  }, [value]);

  return savedRef;
}

export default useLiveRef;
