import * as React from "react";

function useControllableValue<T>(propValue: T | undefined, stateValue: T) {
  const { current: isControlled } = React.useRef(propValue != null);
  const value =
    isControlled && typeof propValue !== "undefined" ? propValue : stateValue;
  return [isControlled, value] as const;
}

export default useControllableValue;
