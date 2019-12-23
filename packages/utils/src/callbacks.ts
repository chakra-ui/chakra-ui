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
 */
export function composeEventHandlers<T extends (event: any) => void>(
  ...fns: (T | undefined)[]
) {
  return function(event: FunctionArguments<T>[0]) {
    fns.some(fn => {
      fn && fn(event);
      return event && event.defaultPrevented;
    });
  };
}

/**
 * Credit: https://github.com/downshift-js/downshift/blob/master/src/utils.js
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
