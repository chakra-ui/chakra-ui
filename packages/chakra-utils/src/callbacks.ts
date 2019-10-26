import * as React from "react";
import { FunctionArguments } from "./types";

export function runCallback(callback: any, ...args: any[]) {
  if (typeof callback === "function") {
    callback(...args);
  }
}

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

export function wrapEventCallback<T extends (event: any) => void>(
  ourHandler: T,
  theirHandler?: T,
) {
  return function(event: FunctionArguments<T>[0]) {
    if (theirHandler) {
      theirHandler(event);
    }

    if (!event.defaultPrevented) {
      return ourHandler(event);
    }
  };
}
