import {
  calculatePrecision,
  roundToPrecision,
  constrainValue,
} from "@chakra-ui/utils";
import * as React from "react";
import { throttle } from "throttle-debounce";
import useControllableValue from "../useControllableValue";
import useInterval from "../useInterval";
import usePrevious from "../usePrevious";

type Action = "increment" | "decrement";
type VoidFunction = () => void;

const TIMEOUT_DURATION = 300;
const INTERVAL_DURATION = 50;

function useCounter(props: any) {
  const {
    onChange,
    precision: precisionProp,
    defaultValue,
    value: valueProp,
    step: stepProp,
  } = props;

  const [valueState, setValue] = React.useState<number | string>(
    defaultValue || 0,
  );
  const [isSpinning, setIsSpinning] = React.useState(false);
  const [action, setAction] = React.useState<Action | null>(null);
  const [runOnce, setRunOnce] = React.useState(true);
  const [isControlled, value] = useControllableValue(valueProp, valueState);

  const timeoutRef = React.useRef<any>();

  /**
   * Value as number
   *
   * Native number input support getting the value as number
   * from event.target.valueAsNumber.
   *
   * If the value in the input field is not valid, the valueAsNumber returns NaN
   * If you type ".", the valueAsNumber doesn't change,
   * It changes when the value is a valid number
   */
  const [valueAsNumber, setValueAsNumber] = React.useState<number>(+value);
  const prevNumberValue = usePrevious(valueAsNumber);

  React.useEffect(() => {
    const isSameValue = +value === prevNumberValue;
    const skipUpdate = isNaN(+value) || isSameValue;
    if (!skipUpdate) {
      setValueAsNumber(+value);
    }
  }, [value, prevNumberValue]);

  const defaultPrecision = Math.max(
    calculatePrecision(stepProp),
    calculatePrecision(valueProp || defaultValue || 0),
  );
  const precision = precisionProp || defaultPrecision;

  const updateValue = React.useCallback(
    (value: number | string) => {
      if (!isControlled) setValue(value);
      if (onChange) onChange(value);
    },
    [onChange, isControlled],
  );

  // Function to clamp the value and round it to the precision
  const prepareNextValue = (value: number) => {
    let nextValue = value;
    if (props.keepWithinRange) {
      nextValue = constrainValue(nextValue, props.min, props.max);
    }
    return roundToPrecision(nextValue, precision);
  };

  // Function to increment the value based on specified step
  const increment = (step: number = stepProp) => {
    const nextValue = prepareNextValue(+value + step);
    updateValue(nextValue);
  };

  // Function to decrement the value based on specified step
  const decrement = (step: number = stepProp) => {
    const nextValue = prepareNextValue(+value - step);
    updateValue(nextValue);
  };

  const activateInterval = isSpinning && Boolean(props.shouldSpin);

  useInterval(
    function() {
      if (action === "increment") increment();
      if (action === "decrement") decrement();
    },
    activateInterval ? INTERVAL_DURATION : null,
  );

  const incOnPointerDown = () => {
    if (runOnce) increment();

    timeoutRef.current = setTimeout(() => {
      setRunOnce(false);
      setIsSpinning(true);
      setAction("increment");
    }, TIMEOUT_DURATION);
  };

  const decOnPointerDown = () => {
    if (runOnce) decrement();

    timeoutRef.current = setTimeout(() => {
      setRunOnce(false);
      setIsSpinning(true);
      setAction("decrement");
    }, TIMEOUT_DURATION);
  };

  const inc = React.useCallback(increment, []);
  const dec = React.useCallback(decrement, []);

  const incOnKeyDown = throttle(INTERVAL_DURATION, () =>
    increment(),
  ) as VoidFunction;

  const decOnKeyDown = throttle(INTERVAL_DURATION, () =>
    decrement(),
  ) as VoidFunction;

  const stop = () => {
    setRunOnce(true);
    setIsSpinning(false);
    removeTimeout();
  };

  const removeTimeout = () => clearTimeout(timeoutRef.current);

  React.useEffect(() => {
    return () => {
      removeTimeout();
    };
  }, []);

  const reset = React.useCallback(() => updateValue(defaultValue || 0), [
    defaultValue,
    updateValue,
  ]);

  const isOutOfRange = value > props.max || value < props.min;
  const isAtMax = value === props.max;
  const isAtMin = value === props.min;

  return {
    // range checks
    isOutOfRange,
    isAtMax,
    isAtMin,
    precision,
    // state
    value,
    valueAsNumber,
    // actions
    update: updateValue,
    stop,
    reset,
    inc,
    dec,
    incOnKeyDown,
    decOnKeyDown,
    incOnPointerDown,
    decOnPointerDown,
  };
}

export default useCounter;
