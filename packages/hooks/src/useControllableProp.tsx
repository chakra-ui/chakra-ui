import * as React from "react";

function useControllableProp<T>(propValue: T | undefined, stateValue: T) {
  const { current: isControlled } = React.useRef(propValue !== undefined);
  const value =
    isControlled && typeof propValue !== "undefined" ? propValue : stateValue;
  return [isControlled, value] as const;
}

export default useControllableProp;
