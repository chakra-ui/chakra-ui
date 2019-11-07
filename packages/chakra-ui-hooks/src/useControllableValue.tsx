import * as React from "react";

function useControllableValue<T>(propValue: T, stateValue: T) {
  const { current: isControlled } = React.useRef(propValue != null);
  const value = isControlled ? propValue : stateValue;
  return [isControlled, value] as const;
}

export default useControllableValue;
