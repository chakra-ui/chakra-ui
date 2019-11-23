import * as React from "react";
import useUpdateEffect from "./useUpdateEffect";

/**
 * React lifecycle hook console logs a value when it mounts
 * and as it updates.
 *
 * @param label a label for the component
 * @param params parameters to log
 */
function useLogger(label: string, ...params: any[]) {
  React.useEffect(() => {
    console.log(`${label} mounted`, ...params);
    return () => console.log(`${label} unmounted`);
  }, []);

  useUpdateEffect(() => {
    console.log(`${label} updated`, ...params);
  });
}

export default useLogger;
