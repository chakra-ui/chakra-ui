import * as React from "react";
import useUpdateEffect from "./useUpdateEffect";

/**
 * React lifecycle hook console logs a value when it mounts
 * and as it updates.
 *
 * @param label a label for the component
 * @param values parameters to log
 */
function useLogger(label: string, ...values: any[]) {
  React.useEffect(() => {
    console.log(`${label} mounted:`, ...values);
    return () => console.log(`${label} unmounted`);
  }, []);

  useUpdateEffect(() => {
    console.log(`${label} updated:`, ...values);
  });
}

export default useLogger;
