/**
 * Welcome to useArrayState hook
 *
 * API References:
 * - https://github.com/jaredpalmer/formik/blob/master/src/FieldArray.tsx
 * - https://github.com/streamich/react-use/blob/master/src/useList.ts
 */

import * as React from "react";

export interface Actions<T> {
  /**
   * Add new value(s) to the end of an array
   */
  add: (...items: T[]) => void;
  /**
   * Blow away the state and set it to the passed items
   */
  set: (items: T[]) => void;
  /**
   * Swap two values in an array
   */
  swap: (indexA: number, indexB: number) => void;
  /**
   * Move an element in an array to another index
   */
  move: (fromIndex: number, toIndex: number) => void;
  /**
   * Insert an element at a given index into the array
   */
  insertAt: (index: number, value: T) => void;
  /**
   * Replace a value at an index of an array
   */
  replace: (index: number, value: T) => void;
  /**
   * Add an element to the beginning of an array and return its length
   */
  unshift: (value: T) => number;
  /**
   * Remove and element at an index of an array
   */
  removeAt: (index: number) => T | undefined;
  /**
   * Remove and return value from the end of the array
   */
  pop: () => T | undefined;
  /**
   * Make the list empty
   */
  clear: () => void;
  /**
   * Reset list to initial value
   */
  reset: () => void;
}

function move<T>(array: T[], from: number, to: number) {
  const copy = [...array];
  const value = copy[from];
  copy.splice(from, 1);
  copy.splice(to, 0, value);
  return copy;
}

export const swap = (
  arrayLike: ArrayLike<any>,
  indexA: number,
  indexB: number,
) => {
  const copy = copyArrayLike(arrayLike);
  const a = copy[indexA];
  copy[indexA] = copy[indexB];
  copy[indexB] = a;
  return copy;
};

export const insert = (
  arrayLike: ArrayLike<any>,
  index: number,
  value: any,
) => {
  const copy = copyArrayLike(arrayLike);
  copy.splice(index, 0, value);
  return copy;
};

export const replace = (
  arrayLike: ArrayLike<any>,
  index: number,
  value: any,
) => {
  const copy = copyArrayLike(arrayLike);
  copy[index] = value;
  return copy;
};

const copyArrayLike = (arrayLike: ArrayLike<any>) => {
  if (!arrayLike) {
    return [];
  } else if (Array.isArray(arrayLike)) {
    return [...arrayLike];
  } else {
    const maxIndex = Object.keys(arrayLike)
      .map(key => parseInt(key))
      .reduce((max, el) => (el > max ? el : max), 0);
    return Array.from({ ...arrayLike, length: maxIndex + 1 });
  }
};

function useArrayState() {}

export default useArrayState;
