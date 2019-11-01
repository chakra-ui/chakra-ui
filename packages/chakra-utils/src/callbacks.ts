import { FunctionArguments, AnyFunction } from "./types";

/**
 * This is checks any callback to ensure it's a
 * function before invoking it with it's arguments
 *
 * @param callback The callback's value
 * @param event The callback's argument/event
 */
export function resolveCallback<T, U>(
  callback: T | ((event: U) => T),
  event?: U,
): T {
  if (typeof callback === "function") {
    //@ts-ignore
    return callback(event);
  }
  return callback;
}

/**
 * Credit: https://github.com/downshift-js/downshift/blob/master/src/utils.js
 *
 * This is intended to be used to compose event handlers.
 * They are executed in order until one of them calls
 * `event.preventDefault()`
 *
 * @param {...Function} fns the event handler functions
 * @return {Function} the event handler to add to an element
 */
export function composeEventHandlers<T extends (event: any) => void>(
  ...fns: T[]
) {
  return (event: FunctionArguments<T>[0]) =>
    fns.some(fn => {
      fn && fn(event);
      return event && event.defaultPrevented;
    });
}

/**
 * Credit: https://github.com/downshift-js/downshift/blob/master/src/utils.js
 *
 * This return a function that will call all the given functions with
 * the arguments with which it's called. It does a null-check before
 * attempting to call the functions and can take any number of functions.
 * @param {...Function} fns the functions to call
 * @return {Function} the function that calls all the functions
 */
export function composeFunctions(...fns: AnyFunction[]) {
  return (...args: any) => {
    fns.forEach(fn => {
      if (fn) {
        fn(...args);
      }
    });
  };
}
