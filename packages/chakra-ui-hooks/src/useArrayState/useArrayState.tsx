/**
 * Welcome to useArrayState hook
 *
 * The hook makes it easy to manage array states
 *
 * References + Credits:
 * - https://github.com/jaredpalmer/formik/blob/master/src/FieldArray.tsx
 * - https://github.com/streamich/react-use/blob/master/src/useList.ts
 */

import * as React from "react";
import useControllableValue from "../useControllableValue";

function useArrayState<T>(props: {
  defaultValue?: T[];
  value?: T[];
  onChange?: (nextValue: T[]) => void;
}) {
  const { onChange, defaultValue, value: valueProp } = props;
  const [valueState, setValue] = React.useState<T[]>(defaultValue || []);
  const [isControlled, value] = useControllableValue(valueProp, valueState);

  const updateState = React.useCallback(
    nextState => {
      if (!isControlled) setValue(nextState);
      if (onChange) onChange(nextState);
    },
    [isControlled, onChange],
  );

  /**
   * Move an element in an array to another index
   */
  const move = React.useCallback(
    (from: number, to: number) => {
      const nextState = [...value];
      const fromValue = nextState[from];

      nextState.splice(from, 1);
      nextState.splice(to, 0, fromValue);

      updateState(nextState);
    },
    [value, updateState],
  );

  /**
   * Add new value(s) to the end of an array
   */
  const add = React.useCallback(
    (...items: T[]) => {
      updateState([...value, ...items]);
    },
    [value, updateState],
  );

  /**
   * Blow away the state and set it to the passed items
   */
  const set = React.useCallback(
    (newValue: T[]) => {
      updateState(newValue);
    },
    [updateState],
  );

  /**
   * Make the list empty
   */
  const clear = React.useCallback(() => {
    updateState([]);
  }, [updateState]);

  /**
   * Reset list to initial value
   */
  const reset = React.useCallback(() => {
    updateState(defaultValue || []);
  }, [defaultValue, updateState]);

  /**
   * Swap two values in an array
   */
  const swap = React.useCallback(
    (indexA: number, indexB: number) => {
      const nextState = [...value];
      const indexAValue = nextState[indexA];
      nextState[indexA] = nextState[indexB];
      nextState[indexB] = indexAValue;
      updateState(nextState);
    },
    [value, updateState],
  );

  /**
   * Insert an element at a given index into the array
   */
  const insertAt = React.useCallback(
    (index: number, item: T) => {
      const nextState = [...value];
      nextState.splice(index, 0, item);
      updateState(nextState);
    },
    [value, updateState],
  );

  /**
   * Remove and element at an index of an array
   */
  const removeAt = React.useCallback(
    (index: number) => {
      const nextState = [...value].filter((_, idx) => index !== idx);
      updateState(nextState);
      return value[index];
    },
    [updateState, value],
  );

  /**
   * Remove and return value from the end of the array
   */
  const pop = React.useCallback(() => {
    const nextState = [...value];
    const poppedItem = nextState.pop();
    updateState(nextState);
    return poppedItem;
  }, [value, updateState]);

  /**
   * Add an element to the beginning of an array and return its length
   */
  const unshift = React.useCallback(() => {
    const nextState = [...value];
    const newLength = nextState.unshift();
    updateState(nextState);
    return newLength;
  }, [value, updateState]);

  /**
   * Replace a value at an index of an array
   */
  const replace = React.useCallback(
    (index: number, item: T) => {
      const nextState = [...value];
      nextState[index] = item;
      updateState(nextState);
    },
    [value, updateState],
  );

  return {
    add,
    set,
    pop,
    move,
    clear,
    reset,
    swap,
    insertAt,
    removeAt,
    unshift,
    replace,
  };
}

export default useArrayState;
