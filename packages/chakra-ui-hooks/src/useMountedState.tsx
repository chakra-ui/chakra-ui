import * as React from "react";

function useMountedState() {
  const mountedRef = React.useRef(false);
  const getState = React.useCallback(() => mountedRef.current, []);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return getState;
}

export default useMountedState;
