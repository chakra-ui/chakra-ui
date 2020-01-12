import { FunctionArguments } from "./types";

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

export { default as memoizeOne } from "memoize-one";
