import {
  calculatePrecision,
  constrainValue,
  maxSafeInteger,
  minSafeInteger,
  roundToPrecision,
} from "@chakra-ui/utils";
import * as React from "react";
import { throttle } from "throttle-debounce";
import useControllableValue from "../useControllableValue";
import useInterval from "../useInterval";

type Action = "increment" | "decrement";
type VoidFunction = () => void;

export interface UseCounterOptions {
  /**
   * The callback fired when the value changes
   */
  onChange?: (value?: string | number, valueAsNumber?: number) => void;
  /**
   * The number of decimal points used to round the value
   */
  precision?: number;
  /**
   * The initial value of the counter. Should be less than `max` and greater than `min`
   */
  defaultValue?: number;
  /**
   * The value of the counter. Should be less than `max` and greater than `min`
   */
  value?: number | string;
  /**
   * The step used to increment or decrement the value
   * @default 1
   */
  step?: number;
  /**
   * The minimum value of the counter
   * @default -Infinity
   */
  min?: number;
  /**
   * The maximum value of the counter
   * @default Infinity
   */
  max?: number;
  /**
   * This controls the value update behavior in general.
   * - If `true` and you use the stepper or up/down arrow keys,
   *  the value will not exceed the `max` or go lower than `min`
   * - Else, the value will be allowed to go out of range.
   *
   * @default true
   */
  keepWithinRange?: boolean;
}

const TIMEOUT_DURATION = 300;
const INTERVAL_DURATION = 50;

function useCounter(props: UseCounterOptions) {
  const {
    onChange,
    precision: precisionProp,
    defaultValue,
    value: valueProp,
    step: stepProp = 1,
    min = minSafeInteger,
    max = maxSafeInteger,
    keepWithinRange,
  } = props;

  // Let's keep the current here and initialize it with the defaultValue
  const [valueState, setValue] = React.useState<number | string>(
    defaultValue || 0,
  );

  // To keep incrementing/decrementing on mousedown, we call that `spinning`
  const [isSpinning, setIsSpinning] = React.useState(false);

  // This state keeps track of the action
  const [action, setAction] = React.useState<Action | null>(null);

  // To increment the value the first time you mousedown, we call that `runOnce`
  const [runOnce, setRunOnce] = React.useState(true);

  /**
   * Because the component that consumes this hook can be controlled or uncontrolled
   * we'll keep track of that
   */
  const [isControlled, value] = useControllableValue(valueProp, valueState);

  // Store the timeout instance id in a ref, so we can clear the timeout later
  const timeoutRef = React.useRef<any>(null);

  // Clears the timeout from memory
  const removeTimeout = () => clearTimeout(timeoutRef.current);

  /**
   * While the state can be a number/string (due to precision logic)
   * We'll create a state to store only the number value
   */
  const [valueAsNumber, setValueAsNumber] = React.useState<number>(+value);

  /**
   * Get the fallback precision from the value or step
   *
   * @example If no precision prop was passed and
   * value = 4, step = 0.01
   *
   * Then precision (or decimal points) is 2
   */
  const fallbackPrecision = Math.max(
    calculatePrecision(stepProp || 1),
    calculatePrecision(+value || 0),
  );
  const precision = precisionProp || fallbackPrecision;

  // If we've reached the max and `keepWithinRange` is true
  // We don't want to fired unnecessary updates, let's store the prev value here
  const prevNextValue = React.useRef<any>(null);

  // Function to update value in state and invoke the `onChange` callback
  const updateValue = React.useCallback(
    (nextValue: number | string) => {
      if (prevNextValue.current == nextValue) return;

      if (!isControlled) {
        setValue(nextValue);
        // Update number state if it's not the same
        // "3.", "3.0" and "3" are considered the same
        const isSameValue = !isNaN(+nextValue) && +nextValue === valueAsNumber;
        if (!isSameValue) setValueAsNumber(+nextValue);
      }
      if (onChange) {
        onChange(nextValue, Number(nextValue));
      }

      prevNextValue.current = nextValue;
    },
    [onChange, isControlled, valueAsNumber],
  );

  // Function to clamp the value and round it to the precision
  const clampAndRoundValue = React.useCallback(
    (value: number) => {
      let nextValue = value;
      if (keepWithinRange) {
        nextValue = constrainValue(nextValue, min, max);
      }
      return roundToPrecision(nextValue, precision);
    },
    [precision, keepWithinRange, max, min],
  );

  // Function to increment the value based on specified step
  const increment = React.useCallback(
    (step: number = stepProp) => {
      let nextValue: string | number = +value + step;
      nextValue = clampAndRoundValue(nextValue);
      updateValue(nextValue);
    },
    [clampAndRoundValue, stepProp, updateValue, value],
  );

  // Function to decrement the value based on specified step
  const decrement = React.useCallback(
    (step: number = stepProp) => {
      const nextValue = clampAndRoundValue(+value - step);
      updateValue(nextValue);
    },
    [clampAndRoundValue, stepProp, updateValue, value],
  );

  /**
   * useInterval hook provides a performant way to
   * update the state value at specific interval
   */
  useInterval(
    () => {
      if (action === "increment") increment();
      if (action === "decrement") decrement();
    },
    isSpinning ? INTERVAL_DURATION : null,
  );

  // Function to activate the spinning and increment the value
  const keepIncrementing = React.useCallback(() => {
    // increment the first fime
    if (runOnce) increment();

    // after a delay, keep incrementing at interval ("spinning up")
    timeoutRef.current = setTimeout(() => {
      setRunOnce(false);
      setIsSpinning(true);
      setAction("increment");
    }, TIMEOUT_DURATION);
  }, [increment, runOnce]);

  // Function to activate the spinning and increment the value
  const keepDecrementing = React.useCallback(() => {
    // decrement the first fime
    if (runOnce) decrement();

    // after a delay, keep decrementing at interval ("spinning down")
    timeoutRef.current = setTimeout(() => {
      setRunOnce(false);
      setIsSpinning(true);
      setAction("decrement");
    }, TIMEOUT_DURATION);
  }, [decrement, runOnce]);

  // increment using throttle (useful for keydown handlers)
  const incrementWithThrottle = throttle(INTERVAL_DURATION, () =>
    increment(),
  ) as VoidFunction;

  // decrement using throttle (useful for keydown handlers)
  const decrementWithThrottle = throttle(INTERVAL_DURATION, () =>
    decrement(),
  ) as VoidFunction;

  // Function to stop spinng (useful for mouseup, keyup handlers)
  const stopSpinning = React.useCallback(() => {
    setRunOnce(true);
    setIsSpinning(false);
    removeTimeout();
  }, []);

  /**
   * If the component unmounts while spinning,
   * let's clear the timeout as well
   */
  React.useEffect(() => {
    return () => {
      removeTimeout();
    };
  }, []);

  // Function to reset the state to the initial value or 0
  const reset = React.useCallback(() => updateValue(defaultValue || 0), [
    defaultValue,
    updateValue,
  ]);

  // Common range checks
  const isOutOfRange = value > max || value < min;
  const isAtMax = value == max;
  const isAtMin = value == min;

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
    clamp: clampAndRoundValue,
    reset,
    increment,
    decrement,
    // throttled actions
    incrementWithThrottle,
    decrementWithThrottle,
    // spinner actions
    stop: stopSpinning,
    keepIncrementing,
    keepDecrementing,
  };
}

export default useCounter;
