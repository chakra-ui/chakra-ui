import * as React from "react";

function isDefined<T>(value: T | undefined): boolean {
  return value != undefined && typeof value !== "undefined";
}

function useControllableValue<T>(propValue: T | undefined, stateValue: T) {
  const { current: isControlled } = React.useRef(isDefined(propValue));
  const value =
    isControlled && typeof propValue !== "undefined" ? propValue : stateValue;
  return [isControlled, value] as const;
}

export default useControllableValue;
